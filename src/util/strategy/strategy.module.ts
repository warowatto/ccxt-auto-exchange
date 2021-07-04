import { Module } from '@nestjs/common';
import { CCXTModule } from '../ccxt/ccxt.module';
import { StrategyService } from './strategy.service';

@Module({
  imports: [CCXTModule],
  providers: [StrategyService],
  exports: [StrategyService],
})
export class StrategyModule {}
