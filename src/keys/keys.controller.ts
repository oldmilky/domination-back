import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/id.validation.pipes';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { KeysService } from './keys.service';
import { KeysDto } from './dto/keys.dto';

@Controller('keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @Get()
  @Auth('admin')
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.keysService.getAll(searchTerm);
  }

  @Get(':id')
  @Auth('admin')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.keysService.byId(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return this.keysService.create();
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: KeysDto,
  ) {
    return this.keysService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.keysService.delete(id);
  }

  @Get('has-keys/:cheatSlug')
  // @Auth('admin') // Or any appropriate role
  async hasKeys(@Param('cheatSlug') cheatSlug: string) {
    const hasKeys = await this.keysService.hasKeys(cheatSlug);
    return { hasKeys };
  }
}
