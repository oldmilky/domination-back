import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @UsePipes(new ValidationPipe())
  @Post('save-order/:id')
  @HttpCode(200)
  async createOrder(@Param('id') id: string, @Body() createPaymentDto: PaymentDto) {
    return this.paymentService.createOrderInHistory(createPaymentDto, id);
  }
}
