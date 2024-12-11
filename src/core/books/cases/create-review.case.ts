import {
  ICreateReviewCase,
  TCreateReviewParams,
} from '@/core/books/types/create-review-case.interface';
import { COMMON_DI_CONSTANTS } from '@/infra/common/common.di-constants';
import { Inject } from '@nestjs/common';
import { ILogger } from '@/lib/logger/types/logger.interface';
import { BOOKS_DI_CONSTANTS } from '@/core/books/books.di-constants';
import { IBooksRepository } from '@/core/books/types/books-repository.interface';
import { UserBookReviewExistsError } from '@/core/books/errors';
import { Review } from '@/core/books/entities/review.entity';

export class CreateReviewCase implements ICreateReviewCase {
  constructor(
    @Inject(COMMON_DI_CONSTANTS.LOGGER)
    private readonly logger: ILogger,
    @Inject(BOOKS_DI_CONSTANTS.BOOKS_REPOSITORY)
    private readonly booksRepository: IBooksRepository,
  ) {
    this.logger.setContext(CreateReviewCase.name);
  }

  public async execute(bookId: string, userId: string, params: TCreateReviewParams): Promise<void> {
    this.logger.info('Starting creating book review.', { bookId, params });

    const existingReview = await this.booksRepository.getReview(bookId, userId);
    if (existingReview) {
      throw new UserBookReviewExistsError({ bookId, userId });
    }

    const review = new Review(params);
    await this.booksRepository.createReview(bookId, userId, review);

    this.logger.info('Successfully created book review.', { review });
  }
}
