import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { GameModel } from './game.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(GameModel) private readonly GameModel: ModelType<GameModel>,
  ) {}

  async bySlug(slug: string) {
    const doc = await this.GameModel.findOne({ slug }).exec();
    if (!doc) throw new NotFoundException('Game not found');
    return doc;
  }

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
    return (
      this.GameModel.aggregate()
        .match(options)
        .lookup({
          from: 'Cheat',
          localField: '_id',
          foreignField: 'game',
          as: 'cheats',
        })
        .addFields({
          countCheats: {
            $size: '$cheats',
          },
        })
        .project({
          __v: 0,
          updatedAt: 0,
          cheat: 0,
        })
        // .find(options)
        // .select('-updatedAt -__v')
        .sort({
          createdAt: 'desc',
        })
        .exec()
    );
  }

  // Admin
  async byId(_id: string) {
    const game = await this.GameModel.findById(_id);
    if (!game) throw new NotFoundException('Game not found');

    return game;
  }

  async create() {
    const defaultValue: CreateGameDto = {
      name: '',
      slug: '',
      desc: '',
      descEn: '',
      seoTitle: '',
      seoTitleEn: '',
      seoDesc: '',
      seoDescEn: '',
      sort: 0,
      slider: false,
      popular: false,
      icon: '',
      image: '',
      imageCard: '',
      sliderImage: '',
    };
    const game = await this.GameModel.create(defaultValue);
    return game._id;
  }

  async update(_id: string, dto: CreateGameDto) {
    const updateDoc = await this.GameModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec();
    if (!updateDoc) throw new NotFoundException('Game not found');

    return updateDoc;
  }

  async delete(id: string) {
    const deleteDoc = this.GameModel.findByIdAndDelete(id).exec();
    if (!deleteDoc) throw new NotFoundException('Game not found');

    return deleteDoc;
  }
}
