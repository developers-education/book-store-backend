import { BookPlain } from '@/core/books/entities/book.entity';

export interface IGetPaginatedBooksBySectionCase {
  execute(sectionId: string, page: number, limit: number): Promise<PaginatedBooksResult>;
}

export type PaginatedBooksResult = {
  books: BookPlain[];
  totalPages: number;
  page: number;
  limit: number;
};
