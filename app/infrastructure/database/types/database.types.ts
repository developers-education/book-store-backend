import { UserTable } from '@/infrastructure/database/tables/user.table';
import { InvalidRefreshTokenTable } from '@/infrastructure/database/tables/invalid-refresh-token.table';
import { MigrationTable } from '@/infrastructure/database/tables/migration.table';
import { Kysely } from 'kysely';
import { BookTable } from '@/infrastructure/database/tables/book.table';
import { ReviewTable } from '@/infrastructure/database/tables/review.table';
import { SectionTable } from '@/infrastructure/database/tables/section.table';
import { SectionToBookTable } from '@/infrastructure/database/tables/section-to-book.table';

type Database = {
  user: UserTable;
  invalidRefreshToken: InvalidRefreshTokenTable;
  book: BookTable;
  review: ReviewTable;
  section: SectionTable;
  sectionToBook: SectionToBookTable;
  __migration: MigrationTable;
};
export type IAppDatabase = Kysely<Database>;
