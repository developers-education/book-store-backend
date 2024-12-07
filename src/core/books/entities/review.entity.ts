import { uuidv7 } from 'uuidv7';
import { ReviewRatingRangeError } from '@/core/books/errors';

export class Review {
  public id: string;
  public text: string;
  private _rating!: number;

  constructor(data: ReviewParams) {
    this.id = data.id ?? uuidv7();
    this.text = data.text;
    this.rating = data.rating;
  }

  public toPlain(): TReviewPlain {
    return {
      id: this.id,
      text: this.text,
      rating: this.rating,
    };
  }

  public set rating(value: number) {
    if (value < 0 || value > 5) {
      throw new ReviewRatingRangeError();
    }
    this._rating = value;
  }

  public get rating() {
    return this._rating;
  }
}

export type ReviewParams = {
  id?: string;
  text: string;
  rating: number;
};

export type TReviewPlain = {
  id: string;
  text: string;
  rating: number;
};
