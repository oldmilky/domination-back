import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class ButtonPair {
  @IsString()
  text: string;
  @IsString()
  textEn: string;
  @IsString()
  textZh: string;
  image?: string;
  video?: string;
}

export class CreateBlogDto {
  @IsString()
  title: string;
  @IsString()
  titleEn: string;
  @IsString()
  titleZh: string;
  @IsString()
  slug: string;
  @IsString()
  subtitle: string;
  @IsString()
  subtitleEn: string;
  @IsString()
  subtitleZh: string;
  @IsString()
  seoTitle: string;
  @IsString()
  seoTitleEn: string;
  @IsString()
  seoTitleZh: string;
  @IsString()
  desc: string;
  @IsString()
  descEn: string;
  @IsString()
  descZh: string;
  @IsString()
  date: string;
  @IsString()
  author: string;
  @ValidateNested({ each: true })
  @Type(() => ButtonPair)
  @IsArray()
  texts: ButtonPair[];
}
