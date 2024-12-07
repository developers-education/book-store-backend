import { uuidv7 } from 'uuidv7';
import { BookDiscountPriceRangeError, BookPriceRangeError } from '@/core/books/errors';

export class Book {
  public id: string;
  public name: string;
  public author: string;
  public description: string;
  public imageUrl: string;
  private _price!: number;
  private _discountPrice!: number | null;

  constructor(data: BookParams) {
    this.id = data.id ?? uuidv7();
    this.name = data.name;
    this.author = data.author;
    this.description = data.description;
    this.imageUrl = data.imageUrl;
    this.price = data.price;
    this.discountPrice = data.discountPrice ?? null;
  }

  public set price(value: number) {
    if (value < 0) {
      throw new BookPriceRangeError();
    }
    this._price = value;
  }

  public get price() {
    return this._price;
  }

  public set discountPrice(value: number | null) {
    if (typeof value === 'number' && value < 0) {
      throw new BookDiscountPriceRangeError();
    }

    this._discountPrice = value;
  }

  public get discountPrice() {
    return this._discountPrice;
  }

  public toPlain(): TBookPlain {
    return {
      id: this.id,
      name: this.name,
      author: this.author,
      description: this.description,
      imageUrl: this.imageUrl,
      price: this.price,
      discountPrice: this.discountPrice,
    };
  }
}

export type BookParams = {
  id?: string;
  name: string;
  author: string;
  description: string;
  imageUrl: string;
  price: number;
  discountPrice?: number | null;
};

export type TBookPlain = {
  id: string;
  name: string;
  author: string;
  description: string;
  imageUrl: string;
  price: number;
  discountPrice: number | null;
};
