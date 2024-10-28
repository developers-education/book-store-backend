import { BookPlain } from '@/core/books/entities/book.entity';
import { ReviewPlain } from '@/core/books/entities/review.entity';

export interface IGetBookWithReviewsCase {
  execute(bookId: string): Promise<BookWithReviews>;
}

export type BookWithReviews = BookPlain & {
  reviews: ReviewPlain[];
};
