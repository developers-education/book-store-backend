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
import { withInternalError } from '@/shared/utils/errors';
import { User } from '@/core/users/entities/user.entity';

@Injectable()
export class BooksRepository implements IBooksRepository {
  constructor(
    @Inject(DATABASE_DI_CONSTANTS.DATABASE)
    private readonly db: IDatabase,
  ) {}

  public async getSectionsWithBooks(limitBooks?: number): Promise<TSectionsWithBooks> {
    return withInternalError(async () => {
      const sectionsRows = await this.db.selectFrom('section').selectAll().execute();

      // FIXME Bad practice - too many queries
      return await Promise.all(
        sectionsRows.map(async (sectionRow) => {
          let booksBuilder = this.db
            .selectFrom('book')
            .selectAll()
            .where('sectionId', '=', sectionRow.id);

          if (limitBooks) {
            booksBuilder = booksBuilder.limit(limitBooks);
          }

          const booksRows = await booksBuilder.execute();

          return {
            section: new Section(sectionRow),
            books: booksRows
              .filter((bookRow) => bookRow.sectionId === sectionRow.id)
              .map((row) => new Book(row)),
          };
        }),
      );
    });
  }

  public async getBooksByIds(ids: string[]): Promise<Book[]> {
    return withInternalError(async () => {
      if (ids.length === 0) {
        return [];
      }
      const result = await this.db.selectFrom('book').selectAll().where('id', 'in', ids).execute();
      return result.map((data) => new Book(data));
    });
  }

  public async getBooksBySection(sectionId: string, options?: TGetBooksOptions): Promise<Book[]> {
    return withInternalError(async () => {
      let builder = this.db.selectFrom('book').selectAll().where('sectionId', '=', sectionId);

      if (options?.limit) {
        builder = builder.limit(options.limit);
      }

      if (options?.offset) {
        builder = builder.offset(options.offset);
      }

      const result = await builder.execute();

      return result.map((data) => new Book(data));
    });
  }

  public async getBooksIds(sectionId?: string): Promise<string[]> {
    return withInternalError(async () => {
      let builder = this.db.selectFrom('book').select('id');

      if (sectionId) {
        builder = builder.where('sectionId', '=', sectionId);
      }

      const result = await builder.execute();
      return result.map((data) => data.id);
    });
  }

  public async getBook(bookId: string): Promise<Book | null> {
    return withInternalError(async () => {
      const result = await this.db
        .selectFrom('book')
        .selectAll()
        .where('id', '=', bookId)
        .executeTakeFirst();
      return result ? new Book(result) : null;
    });
  }

  public async getBookWithReviews(bookId: string): Promise<TBookWithReviews | null> {
    return withInternalError(async () => {
      const bookRow = await this.db
        .selectFrom('book')
        .selectAll()
        .where('book.id', '=', bookId)
        .executeTakeFirst();

      if (!bookRow) {
        return null;
      }

      const reviewsRows = await this.db
        .selectFrom('review')
        .where('bookId', '=', bookRow.id)
        .leftJoin('user', 'user.id', 'review.userId')
        .selectAll(['review', 'user'])
        .select(['review.id as id', 'user.id as userId'])
        .execute();

      return {
        book: new Book(bookRow),
        reviews: reviewsRows.map((row) => {
          return {
            review: new Review(row),
            user: new User({
              id: row.userId,
              login: row.login!,
              passwordHash: row.passwordHash!,
              salt: row.salt!,
            }),
          };
        }),
      };
    });
  }

  public async createReview(bookId: string, userId: string, review: Review): Promise<void> {
    return withInternalError(async () => {
      await this.db
        .insertInto('review')
        .values({ bookId, userId, ...review.toPlain() })
        .returningAll()
        .executeTakeFirst();
    });
  }

  public async getReview(bookId: string, userId: string): Promise<Review | null> {
    return withInternalError(async () => {
      const record = await this.db
        .selectFrom('review')
        .selectAll()
        .where('userId', '=', userId)
        .where('bookId', '=', bookId)
        .executeTakeFirst();

      return record ? new Review(record) : null;
    });
  }
}
