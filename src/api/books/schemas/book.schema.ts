import { z } from 'zod';
import { UUID_EXAMPLE } from '@/shared/constants';

export const bookSchema = z.object({
  id: z.string().openapi({ description: 'Book id', example: UUID_EXAMPLE }),
  name: z.string().openapi({ description: 'Book name', example: 'Clean architecture' }),
  author: z.string().openapi({ description: 'Book author', example: 'Robert Martin' }),
  description: z
    .string()
    .openapi({ description: 'Book description', example: 'Book about building nice code' }),
  imagePath: z.string().openapi({ description: 'Path to image', example: 'image.jpg' }),
  price: z.number().openapi({ description: 'Book price', example: 1000 }),
  discountPrice: z
    .number()
    .nullable()
    .openapi({ description: 'Book price with discount', example: 800 }),
});
