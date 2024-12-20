import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoDBConfig } from './config/mongo.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { GameModule } from './game/game.module';
import { CheatModule } from './cheat/cheat.module';
import { KeysModule } from './keys/keys.module';
import { UserKeyModule } from './user-key/user-key.module';
import { AppController } from './app.controller';
import { PaymentModule } from './payment/payment.module';
import { BlogModule } from './blog/blog.module';
import { LotteryModule } from './lottery/lottery.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDBConfig,
    }),
    UserModule,
    AuthModule,
    FileModule,
    GameModule,
    CheatModule,
    KeysModule,
    UserKeyModule,
    PaymentModule,
    BlogModule,
    LotteryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
