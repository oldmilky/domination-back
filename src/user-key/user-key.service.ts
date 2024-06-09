import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserKeyModel } from './user-key.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { KeysModel } from 'src/keys/keys.model';
import { CheatModel } from 'src/cheat/cheat.model';
import { IssueKeyDto } from './dto/user-key.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserKeyService {
  constructor(
    @InjectModel(UserKeyModel)
    private readonly userKeyModel: ModelType<UserKeyModel>,
    @InjectModel(KeysModel) private readonly keyModel: ModelType<KeysModel>,
    @InjectModel(CheatModel) private readonly cheatModel: ModelType<CheatModel>,
    private readonly userService: UserService,
  ) {}

  async issueRandomKey(issueKeyDto: IssueKeyDto) {
    const { userId, cheatSlug, deadline } = issueKeyDto;

    // Найти cheat по slug
    const cheat = await this.cheatModel.findOne({ slug: cheatSlug }).exec();
    if (!cheat) throw new NotFoundException('Cheat not found');

    // Проверка наличия подходящего срока действия
    const validPlan = cheat.plans.find(plan => plan.deadline === deadline);
    if (!validPlan) throw new NotFoundException(`No plan with deadline ${deadline} found`);

    // Найти все ключи, связанные с cheat
    const keysDocument = await this.keyModel.findOne({ cheat: cheat._id }).exec();
    if (!keysDocument || keysDocument.keys.length === 0)
      throw new NotFoundException('No keys available for this cheat');

    // Выбрать случайный ключ
    const randomKey = keysDocument.keys.find(key => key.deadline === deadline);
    if (!randomKey) throw new NotFoundException('No keys available for the specified deadline');

    // Удалить выданный ключ из массива ключей
    keysDocument.keys = keysDocument.keys.filter(key => !key._id.equals(randomKey._id));
    await keysDocument.save();

    // Создать запись в профиле пользователя
    await this.userService.addIssuedKey(userId, { cheatSlug, key: randomKey.key, deadline });

    return randomKey;
  }
}
