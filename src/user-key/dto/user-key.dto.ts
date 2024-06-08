import { IsMongoId, IsString } from 'class-validator';

export class IssueKeyDto {
  @IsMongoId()
  userId: string;

  @IsString()
  cheatSlug: string;
}
