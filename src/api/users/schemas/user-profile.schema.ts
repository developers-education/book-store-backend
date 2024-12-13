import { z } from 'zod';
import { UUID_EXAMPLE } from '@/shared/constants';

export const userProfileSchema = z.object({
  id: z.string().openapi({ description: 'User id', example: UUID_EXAMPLE }),
  login: z.string().openapi({ description: 'User login', example: 'sirandev' }),
});
