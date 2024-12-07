import { z } from 'zod';

export const reviewSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({ description: 'Айди отзыва', example: '68207933-2e77-4012-a096-5f5f5951c81c' }),
  text: z.string().openapi({ description: 'Содержимое отзыва', example: 'норм' }),
  rating: z.number().openapi({ description: 'Оценка отзыва', example: 4 }),
});
