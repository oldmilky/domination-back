import { Module } from '@nestjs/common';
import { UserKeyService } from './user-key.service';
import { UserKeyController } from './user-key.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserKeyModel } from './user-key.model';
import { KeysModule } from 'src/keys/keys.module';
import { CheatModule } from 'src/cheat/cheat.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserKeyModel,
        schemaOptions: {
          collection: 'UserKey',
        },
      },
    ]),
    KeysModule,
    CheatModule,
    UserModule
  ],
  controllers: [UserKeyController],
  providers: [UserKeyService],
  exports: [UserKeyService],
})
export class UserKeyModule {}