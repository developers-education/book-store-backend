import { Module } from '@nestjs/common';
import { SessionsController } from '@/api/users/sessions.controller';
import { UsersController } from '@/api/users/users.controller';
import { UsersModule } from '@/core/users/users.module';
import { BooksController } from '@/api/books/books.controller';
import { BooksModule } from '@/core/books/books.module';
import { SectionsController } from '@/api/books/sections.controller';

@Module({
  imports: [UsersModule, BooksModule],
  controllers: [UsersController, SessionsController, BooksController, SectionsController],
})
export class ApiModule {}
