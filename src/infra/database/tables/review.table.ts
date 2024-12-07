import { TTableBase } from './base';

export type TReviewTable = TTableBase & {
  id: string;
  bookId: string;
  userId: string;
  text: string;
  rating: number;
};
