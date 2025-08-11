export type Product = {
  id: number;
  availabilityStatus: string;
  discountPercentage: number;
  brand: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  title: string;
  tags: string[];
};

export type ProductApiResponse = {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
};
