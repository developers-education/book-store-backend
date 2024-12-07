import { defineError } from '@/shared/errors/utils/define-error';

export class BookNotFoundError extends defineError('BOOK_NOT_FOUND') {}

// Entity errors
export class BookPriceRangeError extends defineError('BOOK_PRICE_RANGE') {}
export class BookDiscountPriceRangeError extends defineError('BOOK_DISCOUNT_PRICE_RANGE') {}
export class ReviewRatingRangeError extends defineError('REVIEW_RATING_RANGE') {}
