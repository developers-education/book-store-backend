import { Section } from '@/core/books/entities/section.entity';
import { Book } from '@/core/books/entities/book.entity';
import { Review } from '@/core/books/entities/review.entity';
import { User } from '@/core/users/entities/user.entity';

export interface IBooksRepository {
  getBooksIds(sectionId?: string): Promise<string[]>;
  getBooksByIds(ids: string[]): Promise<Book[]>;
  getBooksBySection(sectionId: string, options?: TGetBooksOptions): Promise<Book[]>;
  getSectionsWithBooks(limitBooks?: number): Promise<TSectionsWithBooks>;
  getBookWithReviews(bookId: string): Promise<TBookWithReviews | null>;
  getBook(bookId: string): Promise<Book | null>;
  createReview(bookId: string, userId: string, review: Review): Promise<void>;
  getReview(bookId: string, userId: string): Promise<Review | null>;
}

export type TGetBooksOptions = {
  limit?: number;
  offset?: number;
};

export type TSectionsWithBooks = {
  section: Section;
  books: Book[];
}[];

export type TBookWithReviews = {
  book: Book;
  reviews: {
    review: Review;
    user: User;
  }[];
};
