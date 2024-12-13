import { createZodDto } from '@/lib/zod-dto/dto-helpers';
import { reviewSchema } from '@/api/books/schemas/review.schema';

const createReviewSchema = reviewSchema.omit({ id: true }).extend({
  text: reviewSchema.shape.text.min(1).max(1000),
  rating: reviewSchema.shape.rating.min(1).max(5),
});

export class CreateReviewDto extends createZodDto(createReviewSchema) {}
