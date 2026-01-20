export interface Product {
  id: string;
  name: string;
  category: 'shirts' | 'pants' | 'shoes' | 'accessories';
  price: number;
  sizes: string[];
  description: string;
  images: string[]; // placeholder URLs
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingInfo;
  total: number;
  date: string;
}
