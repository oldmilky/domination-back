import { Module } from '@nestjs/common';
import { CheatController } from './cheat.controller';
import { CheatService } from './cheat.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { CheatModel } from './cheat.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CheatModel,
        schemaOptions: {
          collection: 'Cheat',
        },
      },
    ]),
  ],
  controllers: [CheatController],
  providers: [CheatService],
  exports: [CheatService, TypegooseModule],
})
export class CheatModule {}
