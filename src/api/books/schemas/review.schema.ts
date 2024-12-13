import { z } from 'zod';
import { UUID_EXAMPLE } from '@/shared/constants';

export const reviewSchema = z.object({
  id: z.string().openapi({ description: 'Review id', example: UUID_EXAMPLE }),
  text: z.string().openapi({ description: 'Review text', example: 'Great book!' }),
  rating: z.number().openapi({ description: 'Review rating', example: 5 }),
});
