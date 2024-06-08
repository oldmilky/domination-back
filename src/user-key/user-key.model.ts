import { prop, Ref } from '@typegoose/typegoose';
import { KeysModel } from 'src/keys/keys.model';
import { UserModel } from 'src/user/user.model';

export class UserKeyModel {
  @prop({ ref: () => UserModel })
  user: Ref<UserModel>;

  @prop({ ref: () => KeysModel })
  key: Ref<KeysModel>;

  @prop()
  issuedAt: Date;
}
