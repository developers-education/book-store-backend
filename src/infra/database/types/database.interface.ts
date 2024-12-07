import { Kysely } from 'kysely';
import { TUserTable } from '@/infra/database/tables/user.table';
import { TInvalidRefreshTokenTable } from '@/infra/database/tables/invalid-refresh-token.table';
import { TMigrationTable } from '@/infra/database/tables/migration.table';
import { TSectionToBookTable } from '@/infra/database/tables/section-to-book.table';
import { TBookTable } from '@/infra/database/tables/book.table';
import { TReviewTable } from '@/infra/database/tables/review.table';
import { TSectionTable } from '@/infra/database/tables/section.table';

type TTables = {
  user: TUserTable;
  invalid_refresh_token: TInvalidRefreshTokenTable;
  book: TBookTable;
  review: TReviewTable;
  section: TSectionTable;
  sectionToBook: TSectionToBookTable;
  __migration: TMigrationTable;
};
export interface IDatabase extends Kysely<TTables> {}
