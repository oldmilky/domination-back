import { IsString } from "class-validator";

export class PaymentDto {
  @IsString()
  orderID: string;

  @IsString()
  paymentService: string;
}
