export enum FetchStatus {
  SUCCESS = "success",
  LOADING = "loading",
  ERROR = "error",
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview {
  productId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}