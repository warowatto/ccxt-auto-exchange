import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ExchangeType, TimeFrame } from 'src/util/ccxt/type/ccxt.type';
import { StrategyService } from 'src/util/strategy/strategy.service';

@Injectable()
export class CronService {
  constructor(private strategyService: StrategyService) {}

  /**
   * 매초마다 정보요청을 진행함
   * [초, 분, 시, 일, 월, 요일]
   */
  @Cron(['*', '*', '*', '*', '*', '*'].join(' '))
  async refreshEachSecons() {
    // 바이낸드에서 BTC/USDT 거래내역 5분봉 10개 출력하기
    const result = await this.strategyService.requestNow(
      ExchangeType.BINANCE,
      'BTC/USDT',
      TimeFrame.MIN,
      5,
      10,
      10,
    );

    console.log(result);
  }
}
