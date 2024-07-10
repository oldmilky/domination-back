import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { KeysModel } from './keys.model';
import { KeysDto } from './dto/keys.dto';
import { CheatModel } from 'src/cheat/cheat.model';

@Injectable()
export class KeysService {
  constructor(
    @InjectModel(KeysModel) private readonly keyModel: ModelType<KeysModel>,
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
    return this.keyModel
      .find(options)
      .select('-updatedAt -__v')
      .sort({
        createdAt: 'desc',
      })
      .populate('cheat')
      .exec();
  }

  // Admin
  async byId(id: string) {
    const key = await this.keyModel.findById(id).populate('cheat').exec();
    if (!key) throw new NotFoundException('Key not found');
    return key;
  }

  async create() {
    const defaultValue = {
      cheat: [],
      text: '',
      keys: [],
    };
    const key = await this.keyModel.create(defaultValue);
    return key._id;
  }

  async update(id: string, dto: KeysDto) {
    const cheats = await this.cheatModel
      .find({
        slug: { $in: dto.cheatSlugs },
      })
      .exec();

    if (!cheats || cheats.length !== dto.cheatSlugs.length) {
      const foundSlugs = cheats.map((cheat) => cheat.slug);
      const notFoundSlugs = dto.cheatSlugs.filter(
        (slug) => !foundSlugs.includes(slug),
      );
      throw new NotFoundException(
        `One or more cheats not found: ${notFoundSlugs.join(', ')}`,
      );
    }

    const validDeadlines = cheats.flatMap((cheat) =>
      cheat.plans.map((plan) => plan.deadline),
    );
    for (const key of dto.keys) {
      if (!validDeadlines.includes(key.deadline)) {
        throw new NotFoundException(`Invalid deadline: ${key.deadline}`);
      }
    }

    const updateData: Partial<KeysModel> = {
      cheat: cheats.map((cheat) => cheat._id),
      text: dto.text,
      keys: dto.keys,
    };

    if (dto.keys) {
      updateData.keys = dto.keys;
    }

    const updatedKey = await this.keyModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updatedKey) throw new NotFoundException('Key not found');
    return updatedKey;
  }

  async delete(id: string) {
    const deletedKey = await this.keyModel.findByIdAndDelete(id).exec();
    if (!deletedKey) throw new NotFoundException('Key not found');
    return deletedKey;
  }

  async hasKeys(cheatSlug: string): Promise<boolean> {
    const cheat = await this.cheatModel.findOne({ slug: cheatSlug }).exec();
    if (!cheat) return false;

    const keysDocument = await this.keyModel.findOne({ cheat: cheat._id }).exec();
    return keysDocument && keysDocument.keys.length > 0;
  }
}
