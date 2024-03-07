export type Variant = {
  id: string;
  price: number;
  color: string;
  phoneId: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  model: string;
  variants: Variant[];
};

export type ApiResponse = {
  data: Product[];
  success: boolean;
};
