export enum ExchangeType {
  BINANCE = 'BINANCE',
  UPBIT = 'UPBIT',
}

export enum TimeFrame {
  MIN = 'm',
  HOUR = 'h',
  DAY = 'd'
}

export class OHLCV {
  datetime: Date;
  open: number;
  hight: number;
  low: number;
  close: number;
  volume: number;
}
