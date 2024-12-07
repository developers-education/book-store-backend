import { IBooksRepository } from '@/core/books/types/books-repository.interface';
import {
  IGetPaginatedBooksBySectionCase,
  PaginatedBooksResult,
} from '@/core/books/types/get-paginated-books-by-section-case.interface';
import { inject } from 'di-wise';
import { booksModuleTokens } from '@/core/books/books.module';

export class GetPaginatedBooksBySectionCase implements IGetPaginatedBooksBySectionCase {
  constructor(
    private readonly booksRepository: IBooksRepository = inject(booksModuleTokens.booksRepository),
  ) {}

  public async execute(
    sectionId: string,
    page: number,
    limit: number,
  ): Promise<PaginatedBooksResult> {
    const bookIds = await this.booksRepository.getBooksIds();

    const offset = (page - 1) * limit;
    const totalPages = Math.ceil(bookIds.length / limit);

    const books = await this.booksRepository.getBooksBySection(sectionId, { limit, offset });

    return {
      books: books.map((book) => book.toPlain()),
      page,
      limit,
      totalPages,
    };
  }
}
