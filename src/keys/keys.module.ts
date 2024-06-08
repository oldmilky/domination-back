import { Module } from '@nestjs/common';
import { KeysController } from './keys.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { KeysModel } from './keys.model';
import { KeysService } from './keys.service';
import { CheatModule } from 'src/cheat/cheat.module';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: KeysModel,
        schemaOptions: {
          collection: 'Key',
        },
      },
    ]),
    CheatModule,
  ],
  controllers: [KeysController],
  providers: [KeysService],
  exports: [KeysService, TypegooseModule],
})
export class KeysModule {}
