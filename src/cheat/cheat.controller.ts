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
import { CheatService } from './cheat.service';
import { IdValidationPipe } from 'src/pipes/id.validation.pipes';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UpdateCheatDto } from './dto/update-cheat.dto';

@Controller('cheats')
export class CheatController {
  constructor(private readonly cheatService: CheatService) {}

  @Get('by-slug/:slug')
  async bySlug(@Param('slug') slug: string) {
    return this.cheatService.bySlug(slug);
  }

  @Get('by-game/:gameId')
  async byGame(@Param('gameId', IdValidationPipe) gameId: Types.ObjectId) {
    return this.cheatService.byGame(gameId);
  }

  // @UsePipes(new ValidationPipe())
  // @Post('by-games')
  // @HttpCode(200)
  // async byGames(@Body('gameIds') gameIds: Types.ObjectId[]) {
  //   return this.cheatService.byGames(gameIds);
  // }

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.cheatService.getAll(searchTerm);
  }

  @Get('most-popular')
  async getMostPopular() {
    return this.cheatService.getMostPopular();
  }

  @Put('update-count-opened')
  @HttpCode(200)
  async updateCountOpened(@Body('slug') slug: string) {
    return this.cheatService.updateCountOpened(slug);
  }

  @Get(':id')
  @Auth('admin')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.cheatService.byId(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return this.cheatService.create();
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdateCheatDto,
  ) {
    return this.cheatService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.cheatService.delete(id);
  }
}
