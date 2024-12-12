import * as fsp from 'fs/promises';
import { NestFactory } from '@nestjs/core';
import { DatabaseModule } from '@/infra/database/database.module';
import { IDatabase } from '@/infra/database/types/database.interface';
import { DATABASE_DI_CONSTANTS } from '@/infra/database/database.di-constants';
import * as path from 'node:path';
import { Section } from '@/core/books/entities/section.entity';
import { Book } from '@/core/books/entities/book.entity';

(async () => {
  const appContext = await NestFactory.createApplicationContext(DatabaseModule, { logger: false });
  const db = await appContext.resolve<IDatabase>(DATABASE_DI_CONSTANTS.DATABASE);
  const json = await fsp.readFile(path.resolve('scripts/seeds/data.json'), 'utf8');
  const data: TData = JSON.parse(json);

  await db.transaction().execute(async (ctx) => {
    for (const { section: sectionData } of data) {
      const section = new Section(sectionData);
      await ctx
        .insertInto('section')
        .values(section.toPlain())
        .onConflict((builder) => builder.doUpdateSet({ ...section.toPlain() }))
        .execute();
      for (const bookData of sectionData.books) {
        const book = new Book(bookData);
        await ctx
          .insertInto('book')
          .values({ ...book.toPlain(), sectionId: section.id })
          .onConflict((builder) => builder.doUpdateSet({ ...book.toPlain() }))
          .execute();
      }
    }
  });
})();

type TData = {
  section: {
    id: string;
    name: string;
    books: {
      id: string;
      name: string;
      author: string;
      description: string;
      imagePath: string;
      price: number;
      discountPrice?: number | null;
    }[];
  };
}[];
