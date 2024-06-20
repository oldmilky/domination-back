import { Ref, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { CheatModel } from 'src/cheat/cheat.model';

export interface UserModel extends Base {}

export class IssuedKey {
  @prop()
  cheatSlug: string;

  @prop()
  key: string;

  @prop()
  deadline: number;
}

export class PaymentOrders {
  @prop()
  orderID: string;

  @prop()
  paymentService: string;
}

export class UserModel extends TimeStamps {
  @prop({ unique: true })
  email: string;

  @prop()
  password: string;

  @prop()
  nickname: string;

  @prop({ default: false })
  isAdmin?: boolean;

  @prop({ default: [], ref: () => CheatModel })
  favorites?: Ref<CheatModel>[];

  @prop({ type: () => [IssuedKey], _id: false })
  issuedKeys?: IssuedKey[];

  @prop({ type: () => [PaymentOrders], _id: false })
  paymentOrders?: PaymentOrders[];
}
