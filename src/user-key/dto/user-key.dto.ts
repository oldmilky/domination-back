import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class IssueKeyDto {
  @IsMongoId()
  userId: string;

  @IsString()
  cheatSlug: string;

  @IsNumber()
  deadline: number;
}
