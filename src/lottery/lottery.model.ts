import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface LotteryModel extends Base {}

export class ButtonPair {
  @prop()
  text: string;
  @prop()
  textEn: string;
  image?: string;
  video?: string;
}

export class Button {
  @prop()
  text?: string;
  @prop()
  link?: string;
}

export class LotteryModel extends TimeStamps {
  @prop()
  title: string;
  @prop()
  slug: string;
  @prop()
  titleEn: string;
  @prop()
  subtitle: string;
  @prop()
  subtitleEn: string;
  @prop()
  seoTitle: string;
  @prop()
  seoTitleEn: string;
  @prop()
  desc: string;
  @prop()
  descEn: string;
  @prop()
  date: string;
  @prop()
  author: string;
  @prop()
  texts: ButtonPair[];
  @prop()
  image?: string;
  @prop()
  button: Button[];
}
