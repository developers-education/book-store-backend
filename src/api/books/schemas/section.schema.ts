import { z } from 'zod';
import { UUID_EXAMPLE } from '@/shared/constants';

export const sectionSchema = z.object({
  id: z.string().openapi({ description: 'Section id', example: UUID_EXAMPLE }),
  name: z.string().openapi({ description: 'Section name', example: 'Education' }),
});
