export interface Product {
  id: string;
  image: string | null;
  title: string;
  subtitle: string | null;
  price: number;
  category: string | null;
  stock: number | null;
  createdAt: string;
}

export interface ProductRequest {
  image?: string;
  title: string;
  subtitle?: string;
  price: number;
  category?: string;
  stock?: number;
}

export type ProductUpdate = Partial<ProductRequest>;