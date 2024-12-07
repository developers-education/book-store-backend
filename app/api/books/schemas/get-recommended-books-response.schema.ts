import { z } from 'zod';
import { bookSchema } from '@/api/books/schemas/book.schema';

export const getRecommendedBooksResponseSchema = z.object({
  books: z.array(bookSchema),
});
