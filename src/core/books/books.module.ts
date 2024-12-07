import { Module } from '@nestjs/common';
import { CommonModule } from '@/infra/common/common.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { providers, publicProviders } from '@/core/books/books.providers';

@Module({
  imports: [CommonModule, DatabaseModule],
  providers,
  exports: publicProviders,
})
export class BooksModule {}
