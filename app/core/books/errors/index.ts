import { defineError2 } from '@/lib/errors/utils/define-error';
import { z } from 'zod';

export const BookNotFoundError = defineError2<{ id: string }>('BOOK_NOT_FOUND', {
  id: z.string(),
});

// Entity errors
export const BookPriceRangeError = defineError2('BOOK_PRICE_RANGE');
export const BookDiscountPriceRangeError = defineError2('BOOK_DISCOUNT_PRICE_RANGE');
export const ReviewRatingRangeError = defineError2('REVIEW_RATING_RANGE_ERROR');
