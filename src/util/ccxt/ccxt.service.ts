import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { binance, OrderBook, upbit } from 'ccxt';
import { meanBy, sortBy, sumBy } from 'lodash';
import { ExchangeType, OHLCV, TimeFrame } from './type/ccxt.type';

@Injectable()
export class CCXTService implements OnModuleInit {
  private binance: binance;
  private upbit: upbit;

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    this.binance = new binance();
    this.upbit = new upbit();
  }

  /**
   * 현재가격 불러오기
   *
   * @param exchange
   * @param symbol
   * @returns
   */
  getTicker(exchange: ExchangeType, symbol: string) {
    switch (exchange) {
      case ExchangeType.BINANCE:
        return this.binance.fetchTicker(symbol);
      default:
        return this.upbit.fetchTicker(symbol);
    }
  }

  /**
   *
   * @param exchange
   * @param symbol
   * [일시, 시가, 고가, 저가, 종가, 거래량]
   * @returns ['datetime', 'open', 'high', 'low', 'close', 'volume'][]
   */
  async getOHLCV(
    exchange: ExchangeType,
    symbol: string,
    timeframeType = TimeFrame.MIN,
    timeframeAmount = 1,
    limit = 5,
  ): Promise<{
    exchange: ExchangeType;
    symbol: string;
    requestAt: Date;
    data: OHLCV[];
  }> {
    const timeframe = [timeframeAmount, timeframeType].join('');

    let result: number[][] = [];
    switch (exchange) {
      case ExchangeType.BINANCE:
        result = await this.binance.fetchOHLCV(symbol, timeframe, 0, limit);
        break;
      default:
        result = await this.upbit.fetchOHLCV(symbol, timeframe, 0, limit);
        break;
    }

    const data: OHLCV[] = result.map(
      ([datetime, open, hight, low, close, volume]) => ({
        datetime: new Date(datetime),
        open,
        hight,
        low,
        close,
        volume,
      }),
    );

    return {
      exchange,
      symbol,
      requestAt: new Date(),
      data: sortBy(data, (value) => value.datetime).reverse(),
    };
  }

  /**
   * 거래 예정 내역
   * 매도 매수를 걸어둔 목록
   * Order Books
   * @returns
   */
  async getOrderBook(exchange: ExchangeType, symbol: string, limit = 10) {
    let request: OrderBook;
    switch (exchange) {
      case ExchangeType.BINANCE:
        request = await this.binance.fetchOrderBook(symbol, limit, {});
        break;
      default:
        request = await this.upbit.fetchOrderBook(symbol, limit);
        break;
    }

    const result = {
      buy: {
        totalAmount: sumBy(request.bids, ([amount, count]) => amount * count),
        totalCount: sumBy(request.bids, ([, count]) => count),
        averageAmount: meanBy(
          request.bids,
          ([amount, count]) => amount * count,
        ),
      },
      sell: {
        totalAmount: sumBy(request.asks, ([amount, count]) => amount * count),
        totalCount: sumBy(request.asks, ([, count]) => count),
        averageAmount: meanBy(
          request.asks,
          ([amount, count]) => amount * count,
        ),
      },
    };

    // 매수금액을 매도비율로 나눈값
    // 1인경우 매도와 매수의 비율이 동일함
    // 1보다 작은경우 매도의 비율이 높음 (하락장)
    // 1보다 큰경우 매수의 비율이 높음 (상승장)
    const weight = result.buy.averageAmount / result.sell.averageAmount;
    const deviation = result.buy.averageAmount - result.sell.averageAmount;

    return {
      exchange,
      symbol,
      analysis: { weight, deviation },
      ...result,
      requestAt: new Date(),
    };
  }
}
