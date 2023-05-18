import { Comment } from "./Comment";

export class Product {
  name: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
  id: number;
  comments: Comment[] = [];
  imageUrl: string;

  constructor(productData: any) {
    this.name = productData.name;
    this.count = +productData.count;
    this.size = { width: productData.width, height: productData.height };
    this.weight = productData.weight;
    this.id = +productData.id;
    this.imageUrl = productData.imageUrl;
  }
}
