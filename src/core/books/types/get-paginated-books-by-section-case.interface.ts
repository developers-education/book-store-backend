import { TBookPlain } from '@/core/books/entities/book.entity';

export interface IGetPaginatedBooksBySectionCase {
  execute(sectionId: string, page: number, limit: number): Promise<TPaginatedBooksResult>;
}

export type TPaginatedBooksResult = {
  books: TBookPlain[];
  totalPages: number;
  page: number;
  limit: number;
};
