import { Injectable } from '@nestjs/common';
import { CCXTService } from '../ccxt/ccxt.service';
import { ExchangeType, TimeFrame } from '../ccxt/type/ccxt.type';

@Injectable()
export class StrategyService {
  constructor(private readonly ccxtService: CCXTService) {}

  requestNow(
    exchange: ExchangeType,
    symbol: string,
    timeframeType: TimeFrame,
    timeframeAmount: number,
    ohlcvLimit: number,
    orderBookLimit: number,
  ) {
    return Promise.all([
      this.ccxtService.getTicker(exchange, symbol),
      this.ccxtService.getOHLCV(
        exchange,
        symbol,
        timeframeType,
        timeframeAmount,
        ohlcvLimit,
      ),
      this.ccxtService.getOrderBook(exchange, symbol, orderBookLimit),
    ]);
  }
}
