import { Section } from '@/core/books/entities/section.entity';
import { Book } from '@/core/books/entities/book.entity';
import { Review } from '@/core/books/entities/review.entity';

export interface IBooksRepository {
  getBooksIds(): Promise<string[]>;
  getBooksByIds(ids: string[]): Promise<Book[]>;
  getBooksBySection(sectionId: string, options?: TGetBooksOptions): Promise<Book[]>;
  getSectionsWithBooks(limitBooks?: number): Promise<TSectionsWithBooks>;
  getBookWithReviews(bookId: string): Promise<TBookWithReviews | null>;
  getBook(bookId: string): Promise<Book | null>;
}

export type TGetBooksOptions = {
  limit?: number;
  offset?: number;
};

export type TSectionsWithBooks = {
  section: Section;
  book: Book;
}[];

export type TBookWithReviews = {
  book: Book;
  reviews: Review[];
};
