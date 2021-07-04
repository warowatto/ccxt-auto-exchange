import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CronModule } from './cron/cron.module';
import { DatabaseModule } from './database/database.module';
import { CCXTModule } from './util/ccxt/ccxt.module';
import { StrategyModule } from './util/strategy/strategy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CronModule,
    DatabaseModule,
    CCXTModule,
    StrategyModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
