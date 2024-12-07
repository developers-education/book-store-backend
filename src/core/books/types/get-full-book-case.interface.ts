import { TBookPlain } from '@/core/books/entities/book.entity';
import { TReviewPlain } from '@/core/books/entities/review.entity';

export interface IGetBookWithReviewsCase {
  execute(bookId: string): Promise<TBookWithReviews>;
}

export type TBookWithReviews = TBookPlain & {
  reviews: TReviewPlain[];
};
