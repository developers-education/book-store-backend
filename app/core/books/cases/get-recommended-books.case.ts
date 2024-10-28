import { IBooksRepository } from '@/core/books/types/books-repository.interface';
import { IGetRecommendedBooksCase } from '@/core/books/types/get-recommended-books-case.interface';
import { BookPlain } from '@/core/books/entities/book.entity';
import { getRandomInt } from '@/utils';

export class GetRecommendedBooksCase implements IGetRecommendedBooksCase {
  constructor(private readonly booksRepository: IBooksRepository) {}

  public async execute(booksLimit: number): Promise<BookPlain[]> {
    const bookIds = await this.booksRepository.getBooksIds();
    const bookIdsToGet = this.getBookIdsToProceed(bookIds, booksLimit);

    const books = await this.booksRepository.getBooksByIds(bookIdsToGet);

    return books.map((book) => book.toPlain());
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
