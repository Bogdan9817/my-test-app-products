export class Comment {
  id: number;
  productId: number;
  text: string;
  constructor(id: number, productId: number, text: string) {
    this.id = id;
    this.productId = productId;
    this.text = text;
  }
}
