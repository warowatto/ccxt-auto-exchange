import { Module } from '@nestjs/common';
import { CCXTModule } from './ccxt/ccxt.module';
import { CCXTService } from './ccxt/ccxt.service';

@Module({
  imports: [CCXTModule],
  exports: [CCXTService],
})
export class UtilModule {}
