import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SharedResponses } from '@/infra/api-common/decorators/shared-responses.decorator';
import { ApiResponses } from '@/infra/api-common/decorators/api-responses.decorator';
import { CreateOrderDto } from '@/api/orders/dto/create-order.dto';

@ApiTags('orders')
@Controller('/orders')
@SharedResponses()
export class OrdersController {
  constructor() {}

  @Post()
  @ApiOperation({ summary: 'Create order' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponses(HttpStatus.NO_CONTENT, {
    description: 'Order created',
  })
  public async createOrder(@Body() _dto: CreateOrderDto): Promise<void> {
    // noop
  }
}
