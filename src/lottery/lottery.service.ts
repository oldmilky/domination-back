import { CreateLotteryDto } from './dto/lottery.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { LotteryModel } from './lottery.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class LotteryService {
  constructor(
    @InjectModel(LotteryModel)
    private readonly lotteryModel: ModelType<LotteryModel>,
  ) {}

  async getAll(searchTerm?: string) {
    let options = {};
    if (searchTerm)
      options = {
        $or: [
          {
            title: new RegExp(searchTerm, 'i'),
          },
          {
            titleEn: new RegExp(searchTerm, 'i'),
          },
        ],
      };
    return this.lotteryModel
      .find(options)
      .select('-updatedAt -__v')
      .sort({
        createdAt: 'desc',
      })
      .exec();
  }

  async bySlug(slug: string) {
    const doc = await this.lotteryModel.findOne({ slug }).exec();
    if (!doc) throw new NotFoundException('Cheat not found');
    return doc;
  }

  // Admin
  async byId(_id: string) {
    const doc = await this.lotteryModel.findById(_id);
    if (!doc) throw new NotFoundException('Cheat not found');

    return doc;
  }

  async create() {
    const defaultValue: CreateLotteryDto = {
      title: '',
      titleEn: '',
      slug: '',
      subtitle: '',
      subtitleEn: '',
      seoTitle: '',
      seoTitleEn: '',
      desc: '',
      descEn: '',
      date: '',
      author: '',
      texts: [],
      button: [],
      imageSlider: '',
    };
    const lottery = await this.lotteryModel.create(defaultValue);
    return lottery._id;
  }

  async update(_id: string, dto: CreateLotteryDto) {
    const updateDoc = await this.lotteryModel
      .findByIdAndUpdate(_id, dto, {
        new: true,
      })
      .exec();
    if (!updateDoc) throw new NotFoundException('lottery not found');

    return updateDoc;
  }

  async delete(id: string) {
    const deleteDoc = this.lotteryModel.findByIdAndDelete(id).exec();
    if (!deleteDoc) throw new NotFoundException('lottery not found');

    return deleteDoc;
  }
}
