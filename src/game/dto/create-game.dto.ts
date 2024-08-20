import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  name: string;
  @IsString()
  slug: string;
  @IsString()
  desc: string;
  @IsString()
  descEn: string;
  @IsString()
  seoTitle: string;
  @IsString()
  seoTitleEn: string;
  @IsString()
  seoDesc: string;
  @IsString()
  seoDescEn: string;
  @IsString()
  icon: string;
  @IsString()
  image: string;
  @IsString()
  imageCard: string;
  sort?: number;
  popular?: boolean;
  slider?: boolean;
  sliderImage?: string;
}
