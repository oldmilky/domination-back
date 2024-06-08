import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { IssuedKeyDto, UpdateUserDto } from './dto/update-user.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { Types } from 'mongoose';

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return compare(plainTextPassword, hashedPassword);
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {}

  async byId(_id: string) {
    const user = await this.UserModel.findById(_id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async updateProfile(_id: string, dto: UpdateUserDto) {
    const user = await this.byId(_id);
    const isSameUser = await this.UserModel.findOne({ email: dto.email });

    if (isSameUser && String(_id) !== String(isSameUser._id))
      throw new NotFoundException('Email busy');

    if (dto.currentPassword && dto.password) {
      const isMatch = await comparePasswords(
        dto.currentPassword,
        user.password,
      );
      if (!isMatch) {
        throw new BadRequestException('Current password does not match');
      }

      const salt = await genSalt(10);
      user.password = await hash(dto.password, salt);
    }

    user.email = dto.email;
    if (dto.nickname !== undefined) {
      user.nickname = dto.nickname;
    }
    if (dto.isAdmin || dto.isAdmin === false) user.isAdmin = dto.isAdmin;
    if (dto.issuedKeys) user.issuedKeys = dto.issuedKeys;

    await user.save();

    return;
  }

  async addIssuedKey(userId: string, issuedKey: IssuedKeyDto) {
    const user = await this.byId(userId);
    if (!user.issuedKeys) {
      user.issuedKeys = [];
    }
    user.issuedKeys.push(issuedKey);
    await user.save();
  }

  async adminUpdateUser(_id: string, dto: UpdateUserDto) {
    const user = await this.byId(_id);

    const isSameUser = await this.UserModel.findOne({ email: dto.email });
    if (isSameUser && String(_id) !== String(isSameUser._id)) {
      throw new NotFoundException('Email busy');
    }

    if (dto.password) {
      const salt = await genSalt(10);
      user.password = await hash(dto.password, salt);
    }

    user.email = dto.email;
    if (dto.nickname !== undefined) {
      user.nickname = dto.nickname;
    }
    if (dto.isAdmin !== undefined) {
      user.isAdmin = dto.isAdmin;
    }

    await user.save();
  }

  async getCount() {
    return this.UserModel.find().count().exec();
  }

  async getAll(searchTerm?: string) {
    let options = {};

    if (searchTerm)
      options = {
        $or: [
          {
            email: new RegExp(searchTerm, 'i'),
          },
        ],
      };

    return this.UserModel.find(options)
      .select('-password -updatedAt -__v')
      .sort({
        createdAt: 'desc',
      })
      .exec();
  }

  async delete(id: string) {
    return this.UserModel.findByIdAndDelete(id).exec();
  }

  async toggleFavorites(cheatId: Types.ObjectId, user: UserModel) {
    const { _id, favorites } = user;

    await this.UserModel.findByIdAndUpdate(_id, {
      favorites: favorites.includes(cheatId)
        ? favorites.filter((id) => String(id) !== String(cheatId))
        : [...favorites, cheatId],
    });
  }

  async getFavoriteCheats(_id: Types.ObjectId) {
    return this.UserModel.findById(_id, 'favorites')
      .populate({
        path: 'favorites',
        populate: { path: 'game' },
      })
      .exec()
      .then((data) => data.favorites);
  }
}
