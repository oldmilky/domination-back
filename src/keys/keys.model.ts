import { Ref, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { CheatModel } from 'src/cheat/cheat.model';

export interface KeysModel extends Base {}

export class Key {
  @prop()
  key: string;
}

export class KeysModel extends TimeStamps {
  @prop({ ref: () => CheatModel })
  cheat: Ref<CheatModel>[];

  @prop()
  keys?: Key[];

  @prop()
  text: string;
}
