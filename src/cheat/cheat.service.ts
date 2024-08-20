import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CheatModel } from './cheat.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { Level, Status, UpdateCheatDto } from './dto/update-cheat.dto';

@Injectable()
export class CheatService {
  constructor(
    @InjectModel(CheatModel) private readonly cheatModel: ModelType<CheatModel>,
  ) {}

  async getAll(searchTerm?: string) {
    let options = {};
    if (searchTerm)
      options = {
        $or: [
          {
            name: new RegExp(searchTerm, 'i'),
          },
          {
            slug: new RegExp(searchTerm, 'i'),
          },
        ],
      };
    return this.cheatModel
      .find(options)
      .select('-updatedAt -__v')
      .sort({
        createdAt: 'desc',
      })
      .populate('game')
      .exec();
  }

  async bySlug(slug: string) {
    const doc = await this.cheatModel.findOne({ slug }).populate('game').exec();
    if (!doc) throw new NotFoundException('Cheat not found');
    return doc;
  }

  async byGame(gameId: Types.ObjectId) {
    const doc = await this.cheatModel
      .find({ game: gameId })
      .populate('game')
      .exec();
    if (!doc || doc.length === 0)
      throw new NotFoundException('Cheat not found');
    return doc;
  }

  async getMostPopular() {
    return this.cheatModel
      .find({ countOpened: { $gt: 0 } })
      .sort({ countOpened: -1 })
      .populate('game')
      .exec();
  }

  async updateCountOpened(slug: string) {
    const updateDoc = await this.cheatModel
      .findOneAndUpdate({ slug }, { $inc: { countOpened: 1 } }, { new: true })
      .exec();
    if (!updateDoc) throw new NotFoundException('Cheat not found');

    return updateDoc;
  }

  async updateRating(id: string, newRating: number) {
    return this.cheatModel
      .findByIdAndUpdate(id, { rating: newRating }, { new: true })
      .exec();
  }

  // Admin
  async byId(_id: string) {
    const doc = await this.cheatModel.findById(_id);
    if (!doc) throw new NotFoundException('Cheat not found');

    return doc;
  }

  async create() {
    const defaultValue: UpdateCheatDto = {
      name: '',
      slug: '',
      desc: '',
      descEn: '',
      seoTitle: '',
      seoTitleEn: '',
      seoDesc: '',
      seoDescEn: '',
      game: [],
      plans: [],
      status: Status.undetected,
      level: Level.legit,
      os: '',
      gamemode: '',
      gamemodeEn: '',
      cpu: '',
      client: '',
      disk: '',
      bios: '',
      gpu: '',
      flash: '',
      flashEn: '',
      record: '',
      recordEn: '',
      spoofer: '',
      spooferEn: '',
      aimbot: [],
      visuals: [],
      loot: [],
      radar: [],
      misc: [],
      other: [],
      tags: [],
      image: '',
      image2: '',
      image3: '',
      image4: '',
      image5: '',
      image6: '',
      video: '',
      video2: '',
      popularHome: false,
      hot: false,
      sort: 0,
    };
    const cheat = await this.cheatModel.create(defaultValue);
    return cheat._id;
  }

  async update(_id: string, dto: UpdateCheatDto) {
    const updateDoc = await this.cheatModel
      .findByIdAndUpdate(_id, dto, {
        new: true,
      })
      .exec();
    if (!updateDoc) throw new NotFoundException('cheat not found');

    return updateDoc;
  }

  async delete(id: string) {
    const deleteDoc = this.cheatModel.findByIdAndDelete(id).exec();
    if (!deleteDoc) throw new NotFoundException('cheat not found');

    return deleteDoc;
  }
}
