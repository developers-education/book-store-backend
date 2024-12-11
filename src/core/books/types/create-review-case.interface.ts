export interface ICreateReviewCase {
  execute(bookId: string, userId: string, params: TCreateReviewParams): Promise<void>;
}

export type TCreateReviewParams = {
  text: string;
  rating: number;
};
