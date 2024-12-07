import {
  TGetBooksOptions,
  TBookWithReviews,
  TSectionsWithBooks,
  IBooksRepository,
} from '@/core/books/types/books-repository.interface';
import { Book } from '@/core/books/entities/book.entity';
import { Section } from '@/core/books/entities/section.entity';
import { Review } from '@/core/books/entities/review.entity';
import { IDatabase } from '@/infra/database/types/database.interface';
import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_DI_CONSTANTS } from '@/infra/database/database.di-constants';

@Injectable()
export class BooksRepository implements IBooksRepository {
  constructor(
    @Inject(DATABASE_DI_CONSTANTS.DATABASE)
    private readonly db: IDatabase,
  ) {}

  public async getSectionsWithBooks(): Promise<TSectionsWithBooks> {
    const result = await this.db
      .selectFrom('section')
      .innerJoin('sectionToBook as stb', 'stb.sectionId', 'section.id')
      .innerJoin('book', 'book.id', 'stb.bookId')
      .selectAll(['section', 'book'])
      .select(['section.name as name', 'book.name as bookName'])
      .select(['section.id as id', 'book.id as bookId'])
      .execute();

    return result.map((data) => {
      const book = new Book({
        ...data,
        id: data.bookId,
        name: data.bookName,
      });
      const section = new Section(data);
      return { book, section };
    });
  }

  public async getBooksByIds(ids: string[]): Promise<Book[]> {
    if (ids.length === 0) {
      return [];
    }
    const result = await this.db.selectFrom('book').selectAll().where('id', 'in', ids).execute();
    return result.map((data) => new Book(data));
  }

  public async getBooksBySection(sectionId: string, options?: TGetBooksOptions): Promise<Book[]> {
    let builder = this.db
      .selectFrom('book')
      .selectAll()
      .innerJoin('sectionToBook as stb', 'stb.bookId', 'book.id')
      .where('stb.sectionId', '=', sectionId);

    if (options?.limit) {
      builder = builder.limit(options.limit);
    }

    if (options?.offset) {
      builder = builder.offset(options.offset);
    }

    const result = await builder.execute();

    return result.map((data) => new Book(data));
  }

  public async getBooksIds(): Promise<string[]> {
    const result = await this.db.selectFrom('book').select('id').execute();
    return result.map((data) => data.id);
  }

  public async getBook(bookId: string): Promise<Book | null> {
    const result = await this.db
      .selectFrom('book')
      .selectAll()
      .where('id', '=', bookId)
      .executeTakeFirst();
    return result ? new Book(result) : null;
  }

  public async getBookWithReviews(bookId: string): Promise<TBookWithReviews | null> {
    const result = await this.db
      .selectFrom('book')
      .where('book.id', '=', bookId)
      .innerJoin('review', 'review.bookId', 'book.id')
      .selectAll(['book', 'review'])
      .select(['book.id as bookId', 'review.id as reviewId'])
      .execute();

    if (result.length === 0) {
      return null;
    }

    const book = new Book({ ...result[0], id: result[0].bookId });
    const reviews: Review[] = result.map(
      (data) =>
        new Review({
          ...data,
          id: data.reviewId,
        }),
    );

    return {
      book,
      reviews,
    };
  }
}
