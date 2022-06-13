export interface Product {
  id: number;
  name: string;
  description: string;
  thumbUrl: string;
  type: number;
  prices: {
    name: string;
    price: number;
  }[];
}
