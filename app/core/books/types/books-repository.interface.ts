import { Section } from '@/core/books/entities/section.entity';
import { Book } from '@/core/books/entities/book.entity';
import { Review } from '@/core/books/entities/review.entity';

export interface IBooksRepository {
  getBooksIds(): Promise<string[]>;
  getBooksByIds(ids: string[]): Promise<Book[]>;
  getBooksBySection(sectionId: string, options?: GetBooksOptions): Promise<Book[]>;
  getSectionsWithBooks(limitBooks?: number): Promise<SectionsWithBooks>;
  getBookWithReviews(bookId: string): Promise<BookWithReviews | null>;
  getBook(bookId: string): Promise<Book | null>;
}

export type GetBooksOptions = {
  limit?: number;
  offset?: number;
};

export type SectionsWithBooks = {
  section: Section;
  book: Book;
}[];

export type BookWithReviews = {
  book: Book;
  reviews: Review[];
};
