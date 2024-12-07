import { z } from 'zod';
import { bookSchema } from '@/api/books/schemas/book.schema';
import { reviewSchema } from '@/api/books/schemas/review.schema';

export const getBookResponseSchema = bookSchema.extend({
  reviews: z.array(reviewSchema),
});
