import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface GameModel extends Base {}

export class GameModel extends TimeStamps {
  @prop()
  name: string;
  @prop({ unique: true })
  slug: string;
  @prop()
  desc: string;
  @prop()
  descEn: string;
  @prop()
  seoTitle: string;
  @prop()
  seoTitleEn: string;
  @prop()
  seoDesc: string;
  @prop()
  seoDescEn: string;
  @prop()
  sort?: number;
  @prop()
  slider?: boolean;
  @prop()
  icon: string;
  @prop()
  image: string;
  @prop()
  imageCard: string;
  @prop()
  popular: boolean;
  @prop()
  sliderImage?: string;
}