import { Body, Controller, Post } from '@nestjs/common';
import { UserKeyService } from './user-key.service';
import { IssueKeyDto } from './dto/user-key.dto';

@Controller('user-keys')
export class UserKeyController {
  constructor(private readonly userKeyService: UserKeyService) {}

  @Post('issue')
  async issueKey(@Body() issueKeyDto: IssueKeyDto) {
    return this.userKeyService.issueRandomKey(issueKeyDto);
  }
}
