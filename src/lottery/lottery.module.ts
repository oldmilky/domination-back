import { Module } from '@nestjs/common';
import { LotteryService } from './lottery.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { LotteryModel } from './lottery.model';
import { LotteryController } from './lottery.controller';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: LotteryModel,
        schemaOptions: {
          collection: 'Lottery',
        },
      },
    ]),
  ],
  controllers: [LotteryController],
  providers: [LotteryService],
})
export class LotteryModule {}