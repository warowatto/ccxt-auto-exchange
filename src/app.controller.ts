import { Controller, Get } from '@nestjs/common';
import { CCXTService } from './util/ccxt/ccxt.service';
import { ExchangeType, TimeFrame } from './util/ccxt/type/ccxt.type';
import { StrategyService } from './util/strategy/strategy.service';

@Controller()
export class AppController {
  constructor(
    private readonly ccxtService: CCXTService,
    private readonly strategyService: StrategyService,
  ) {}

  @Get()
  getHello() {
    return this.ccxtService.getTicker(ExchangeType.BINANCE, 'BTC/USDT');
  }

  @Get('1')
  async ohlcv() {
    return this.ccxtService.getOHLCV(
      ExchangeType.BINANCE,
      'BTC/USDT',
      TimeFrame.MIN,
      5,
      10,
    );
  }

  @Get('2')
  async fetchOrderBook() {
    return this.ccxtService.getOrderBook(ExchangeType.BINANCE, 'BTC/USDT');
  }

  @Get('3')
  async decision() {
    return this.strategyService.requestNow(
      ExchangeType.BINANCE,
      'BTC/USDT',
      TimeFrame.MIN,
      5,
      10,
      10,
    );
  }
}
