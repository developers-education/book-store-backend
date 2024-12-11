import { z } from 'zod';
import { createZodDto } from '@/lib/zod-dto/dto-helpers';

const createReviewSchema = z.object({
  text: z.string().min(1).max(1000).openapi({ description: 'Review text', example: 'Great book!' }),
  rating: z.number().min(1).max(5).openapi({ description: 'Review rating', example: 5 }),
});

export class CreateReviewDto extends createZodDto(createReviewSchema) {}
