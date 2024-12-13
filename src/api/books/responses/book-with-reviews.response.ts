import { z } from 'zod';
import { createZodDto } from '@/lib/zod-dto/dto-helpers';
import { bookSchema } from '@/api/books/schemas/book.schema';
import { reviewSchema } from '@/api/books/schemas/review.schema';
import { userProfileSchema } from '@/api/users/schemas/user-profile.schema';

const bookWithReviewsSchema = bookSchema.extend({
  reviews: z.array(
    z.object({
      review: reviewSchema,
      user: userProfileSchema,
    }),
  ),
});

export class BookWithReviewsResponse extends createZodDto(bookWithReviewsSchema) {}
