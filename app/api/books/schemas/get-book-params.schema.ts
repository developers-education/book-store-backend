import { z } from 'zod';

export const getBookParamsSchema = z.object({
  id: z.string().uuid(),
});
