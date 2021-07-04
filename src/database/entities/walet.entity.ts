import { ExchangeType } from 'src/util/ccxt/type/ccxt.type';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DecimalTransFormer } from '../transformer/DecimalTransFormer';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, comment: '거래소' })
  exchange: ExchangeType;

  @Column({ type: 'varchar', comment: '암호화폐 종류' })
  currency: string;

  @Column({
    type: 'decimal',
    transformer: new DecimalTransFormer(),
    comment: '보유량',
  })
  amount: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '최종 업데이트 일자' })
  updatedAt: Date;
}
