import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

class Key {
  @IsMongoId()
  _id: Types.ObjectId;

  @IsString()
  key: string;
}

export class KeysDto {
  @IsArray()
  @IsString({ each: true })
  cheatSlugs: string[];

  @IsOptional()
  @Type(() => Key)
  @IsArray()
  keys?: Key[];

  @IsString()
  text: string;
}
