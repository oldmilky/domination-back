import { Ref, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { GameModel } from 'src/game/game.model';
import { Level, Status } from './dto/update-cheat.dto';

export interface CheatModel extends Base {}

export class Plans {
  @prop()
  deadline: number;
  @prop()
  link: string;
  @prop()
  linkEn?: string;
  @prop()
  price: number;
  @prop()
  priceEn?: number;
  @prop()
  priceZh?: number;
}

export class ButtonPair {
  @prop()
  button: string;
  @prop()
  buttonEn: string;
}

export class CheatModel extends TimeStamps {
  @prop()
  name: string;
  @prop({ unique: true })
  slug: string;
  @prop()
  desc: string;
  @prop()
  descEn: string;
  @prop()
  descZh: string;
  @prop()
  seoTitle: string;
  @prop()
  seoTitleEn: string;
  @prop()
  seoTitleZh: string;
  @prop()
  seoDesc: string;
  @prop()
  seoDescEn: string;
  @prop()
  seoDescZh: string;

  @prop({ ref: () => GameModel })
  game: Ref<GameModel>[];

  @prop()
  plans: Plans[];

  @prop()
  status: Status;

  @prop()
  level: Level;

  @prop()
  os?: string;
  @prop()
  gamemode?: string;
  @prop()
  gamemodeEn?: string;
  @prop()
  cpu?: string;
  @prop()
  client?: string;
  @prop()
  disk?: string;
  @prop()
  bios?: string;
  @prop()
  gpu?: string;
  @prop()
  flash?: string;
  @prop()
  flashEn?: string;
  @prop()
  record?: string;
  @prop()
  recordEn?: string;
  @prop()
  spoofer?: string;
  @prop()
  spooferEn?: string;

  @prop()
  aimbot?: ButtonPair[];
  @prop()
  visuals?: ButtonPair[];
  @prop()
  loot?: ButtonPair[];
  @prop()
  radar?: ButtonPair[];
  @prop()
  misc?: ButtonPair[];
  @prop()
  other?: ButtonPair[];
  
  @prop()
  tags?: ButtonPair[];

  @prop()
  image: string;
  @prop()
  image2: string;
  @prop()
  image3?: string;
  @prop()
  image4?: string;
  @prop()
  image5?: string;
  @prop()
  image6?: string;
  @prop()
  video?: string;
  @prop()
  video2?: string;

  @prop({ default: 0 })
  countOpened?: number;

  @prop({ default: 0 })
  sort?: number;
  @prop({ default: false })
  popularHome?: boolean;
  @prop({ default: false })
  hot?: boolean;
}
