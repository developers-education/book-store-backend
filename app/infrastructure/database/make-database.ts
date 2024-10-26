import SQLite from 'better-sqlite3';
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely';
import { IAppDatabase } from '@/infrastructure/database/types/database.types';

export function makeDatabase(): IAppDatabase {
  return new Kysely({
    dialect: new SqliteDialect({
      database: new SQLite('db/app.db'),
    }),
    plugins: [
      new CamelCasePlugin({
        underscoreBeforeDigits: true,
      }),
    ],
  });
}
