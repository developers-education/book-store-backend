import { IBooksRepository } from '@/core/books/types/books-repository.interface';
import {
  IGetPaginatedBooksBySectionCase,
  TPaginatedBooksResult,
} from '@/core/books/types/get-paginated-books-by-section-case.interface';
import { Inject, Injectable } from '@nestjs/common';
import { BOOKS_DI_CONSTANTS } from '@/core/books/books.di-constants';
import { COMMON_DI_CONSTANTS } from '@/infra/common/common.di-constants';
import { ILogger } from '@/lib/logger/types/logger.interface';

@Injectable()
export class GetPaginatedBooksBySectionCase implements IGetPaginatedBooksBySectionCase {
  constructor(
    @Inject(COMMON_DI_CONSTANTS.LOGGER)
    private readonly logger: ILogger,
    @Inject(BOOKS_DI_CONSTANTS.BOOKS_REPOSITORY)
    private readonly booksRepository: IBooksRepository,
  ) {
    this.logger.setContext(GetPaginatedBooksBySectionCase.name);
  }

  public async execute(
    sectionId: string,
    page: number,
    limit: number,
  ): Promise<TPaginatedBooksResult> {
    this.logger.info('Starting getting paginated books by section.', { sectionId, page, limit });

    const bookIds = await this.booksRepository.getBooksIds(sectionId);

    const offset = (page - 1) * limit;
    const totalPages = Math.ceil(bookIds.length / limit);

    const books = await this.booksRepository.getBooksBySection(sectionId, { limit, offset });

    const result: TPaginatedBooksResult = {
      books: books.map((book) => book.toPlain()),
      page,
      limit,
      totalPages,
    };

    this.logger.info('Successfully got paginated books by section.', { result });

    return result;
  }
}
