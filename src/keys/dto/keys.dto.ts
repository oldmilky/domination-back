import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

class Key {
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
