import { ValueTransformer } from 'typeorm';

export class DecimalTransFormer implements ValueTransformer {
  to(value: number) {
    return value;
  }
  from(value: string) {
    return parseFloat(value);
  }
}
