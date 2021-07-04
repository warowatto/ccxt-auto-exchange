import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CCXTModule } from 'src/util/ccxt/ccxt.module';
import { StrategyModule } from 'src/util/strategy/strategy.module';

@Module({
  imports: [ScheduleModule.forRoot(), StrategyModule],
  providers: []
})
export class CronModule {}
