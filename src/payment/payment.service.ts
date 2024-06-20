import { Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from 'src/user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {}

  async createOrderInHistory(createPaymentDto: PaymentDto, userID: string) {
    const user = await this.UserModel.findById(userID);
    if (!user) {
      throw new Error('User not found');
    }

    user.paymentOrders.push(createPaymentDto);
    await user.save();
  }
}
