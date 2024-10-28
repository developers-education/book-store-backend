import { TableBase } from './base';

export type ReviewTable = TableBase & {
  id: string;
  bookId: string;
  userId: string;
  text: string;
  rating: number;
};
