import { z } from 'zod';
import { UUID_EXAMPLE } from '@/shared/constants';
import { createZodDto } from '@/lib/zod-dto/dto-helpers';

const orderItemSchema = z.object({
  bookId: z.string().uuid().openapi({ description: 'Book id', example: UUID_EXAMPLE }),
  quantity: z.number().min(1).openapi({ description: 'Quantity of books to order', example: 2 }),
});

const createOrderSchema = z.object({
  order: z.array(orderItemSchema).min(1),
});

export class CreateOrderDto extends createZodDto(createOrderSchema) {}
