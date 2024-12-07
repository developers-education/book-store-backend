import { IBooksRepository } from '@/core/books/types/books-repository.interface';
import { IGetRecommendedBooksCase } from '@/core/books/types/get-recommended-books-case.interface';
import { TBookPlain } from '@/core/books/entities/book.entity';
import { Inject, Injectable } from '@nestjs/common';
import { BOOKS_DI_CONSTANTS } from '@/core/books/books.di-constants';
import { getRandomInt } from '@/shared/utils/random';
import { COMMON_DI_CONSTANTS } from '@/infra/common/common.di-constants';
import { ILogger } from '@/lib/logger/types/logger.interface';
import { toInternalError } from '@/shared/utils/errors';

@Injectable()
export class GetRecommendedBooksCase implements IGetRecommendedBooksCase {
  constructor(
    @Inject(COMMON_DI_CONSTANTS.LOGGER)
    private readonly logger: ILogger,
    @Inject(BOOKS_DI_CONSTANTS.BOOKS_REPOSITORY)
    private readonly booksRepository: IBooksRepository,
  ) {
    this.logger.setContext(GetRecommendedBooksCase.name);
  }

  public async execute(booksLimit: number): Promise<TBookPlain[]> {
    this.logger.info('Starting getting recommended books.', { booksLimit });

    const bookIds = await this.booksRepository.getBooksIds();
    const bookIdsToGet = this.getBookIdsToProceed(bookIds, booksLimit);

    const books = await this.booksRepository.getBooksByIds(bookIdsToGet).catch(toInternalError);

    const plainBooks: TBookPlain[] = books.map((book) => book.toPlain());

    this.logger.info('Successfully got recommended books.', { plainBooks });

    return plainBooks;
  }

  private getBookIdsToProceed(bookIds: string[], amount: number): string[] {
    if (bookIds.length < amount) {
      return bookIds;
    } else {
      return this.getRandomIds(bookIds, amount);
    }
  }

  private getRandomIds(bookIds: string[], amount: number): string[] {
    const result: Set<string> = new Set();

    while (result.size !== amount) {
      const randomIndex = getRandomInt(0, bookIds.length);
      const id = bookIds[randomIndex];
      if (!result.has(id)) {
        result.add(id);
      }
    }

    return Array.from(result);
  }
}
