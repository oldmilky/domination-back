import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { GameModel } from './game.model';
import { GameController } from './game.controller';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: GameModel,
        schemaOptions: {
          collection: 'Game',
        },
      },
    ]),
    // CheatModule,
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
