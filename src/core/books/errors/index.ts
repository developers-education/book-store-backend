import { defineError } from '@/shared/errors/utils/define-error';
import { z } from 'zod';

export class BookNotFoundError extends defineError('BOOK_NOT_FOUND') {}
export class UserBookReviewExistsError extends defineError('USER_BOOK_REVIEW_EXISTS', {
  bookId: z.string(),
  userId: z.string(),
}) {}

// Entity errors
export class BookPriceRangeError extends defineError('BOOK_PRICE_RANGE') {}
export class BookDiscountPriceRangeError extends defineError('BOOK_DISCOUNT_PRICE_RANGE') {}
export class ReviewRatingRangeError extends defineError('REVIEW_RATING_RANGE') {}
