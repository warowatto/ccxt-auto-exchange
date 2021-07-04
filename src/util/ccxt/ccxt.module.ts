import { Module } from '@nestjs/common';
import { CCXTService } from './ccxt.service';

@Module({
  providers: [CCXTService],
  exports: [CCXTService],
})
export class CCXTModule {}
