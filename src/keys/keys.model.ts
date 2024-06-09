import { Ref, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { CheatModel } from 'src/cheat/cheat.model';

export interface KeysModel extends Base {}

export class Key {
  @prop({ default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @prop()
  key: string;

  @prop()
  deadline: number;
}

export class KeysModel extends TimeStamps {
  @prop({ ref: () => CheatModel })
  cheat: Ref<CheatModel>[];

  @prop({ type: () => [Key] })
  keys: Key[];

  @prop()
  text: string;
}
