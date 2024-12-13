import { TBookPlain } from '@/core/books/entities/book.entity';
import { TReviewPlain } from '@/core/books/entities/review.entity';
import { TUserProfile } from '@/core/users/entities/user.entity';

export interface IGetBookWithReviewsCase {
  execute(bookId: string): Promise<TBookWithReviews>;
}

export type TBookWithReviews = TBookPlain & {
  reviews: {
    review: TReviewPlain;
    user: TUserProfile;
  }[];
};
