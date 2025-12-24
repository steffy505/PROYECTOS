
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  maxStock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export type ViewType = 'inicio' | 'productos' | 'comentarios' | 'pagos';
