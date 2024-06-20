import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface BlogModel extends Base {}

export class ButtonPair {
  @prop()
  text: string;
  @prop()
  textEn: string;
  @prop()
  textZh: string;
  image?: string;
  video?: string;
}

export class BlogModel extends TimeStamps {
  @prop()
  title: string;
  @prop()
  slug: string;
  @prop()
  titleEn: string;
  @prop()
  titleZh: string;
  @prop()
  subtitle: string;
  @prop()
  subtitleEn: string;
  @prop()
  subtitleZh: string;
  @prop()
  seoTitle: string;
  @prop()
  seoTitleEn: string;
  @prop()
  seoTitleZh: string;
  @prop()
  desc: string;
  @prop()
  descEn: string;
  @prop()
  descZh: string;
  @prop()
  date: string;
  @prop()
  author: string;
  @prop()
  texts: ButtonPair[];
  @prop()
  image?: string;
}
