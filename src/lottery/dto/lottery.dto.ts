import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class ButtonPair {
  @IsString()
  text: string;
  @IsString()
  textEn: string;
  image?: string;
  video?: string;
}

class Button {
  @IsString()
  text?: string;
  @IsString()
  textEn?: string;
  @IsString()
  link?: string;
}

export class CreateLotteryDto {
  @IsString()
  title: string;
  @IsString()
  titleEn: string;
  @IsString()
  slug: string;
  @IsString()
  subtitle: string;
  @IsString()
  subtitleEn: string;
  @IsString()
  seoTitle: string;
  @IsString()
  seoTitleEn: string;
  @IsString()
  desc: string;
  @IsString()
  descEn: string;
  @IsString()
  date: string;
  @IsString()
  author: string;
  @ValidateNested({ each: true })
  @Type(() => ButtonPair)
  @IsArray()
  texts: ButtonPair[];
  @ValidateNested({ each: true })
  @Type(() => ButtonPair)
  @IsArray()
  button: Button[];

  imageSlider?: string;
}
