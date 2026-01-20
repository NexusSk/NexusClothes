import type { Product } from '../types';

export const products: Product[] = [
  // Shirts
  {
    id: 'shirt-1',
    name: 'Classic White Tee',
    category: 'shirts',
    price: 49.99,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A timeless essential crafted from premium cotton. Perfect for any occasion.',
    images: ['placeholder', 'placeholder', 'placeholder'],
  },
  {
    id: 'shirt-2',
    name: 'Oversized Black Shirt',
    category: 'shirts',
    price: 69.99,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Relaxed fit with dropped shoulders. Made from organic cotton blend.',
    images: ['placeholder', 'placeholder'],
  },
  {
    id: 'shirt-3',
    name: 'Linen Summer Shirt',
    category: 'shirts',
    price: 89.99,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Breathable linen shirt perfect for warm weather. Minimalist design.',
    images: ['placeholder', 'placeholder', 'placeholder'],
  },
  {
    id: 'shirt-4',
    name: 'Graphic Print Tee',
    category: 'shirts',
    price: 59.99,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Bold statement piece with exclusive Nexus artwork.',
    images: ['placeholder', 'placeholder'],
  },

  // Pants
  {
    id: 'pants-1',
    name: 'Slim Fit Chinos',
    category: 'pants',
    price: 99.99,
    sizes: ['28', '30', '32', '34', '36'],
    description: 'Modern slim fit chinos with stretch comfort. Versatile for work or weekend.',
    images: ['placeholder', 'placeholder', 'placeholder'],
  },
  {
    id: 'pants-2',
    name: 'Wide Leg Trousers',
    category: 'pants',
    price: 129.99,
    sizes: ['28', '30', '32', '34'],
    description: 'Elevated wide leg silhouette. High-waisted with pleated front.',
    images: ['placeholder', 'placeholder'],
  },
  {
    id: 'pants-3',
    name: 'Relaxed Denim Jeans',
    category: 'pants',
    price: 149.99,
    sizes: ['28', '30', '32', '34', '36'],
    description: 'Premium selvedge denim with relaxed fit. Crafted in Japan.',
    images: ['placeholder', 'placeholder', 'placeholder'],
  },
  {
    id: 'pants-4',
    name: 'Cargo Pants',
    category: 'pants',
    price: 119.99,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Utility-inspired cargo pants with multiple pockets. Durable cotton twill.',
    images: ['placeholder', 'placeholder'],
  },

  // Shoes
  {
    id: 'shoes-1',
    name: 'Minimalist Sneakers',
    category: 'shoes',
    price: 189.99,
    sizes: ['7', '8', '9', '10', '11', '12'],
    description: 'Clean leather sneakers with cushioned sole. Handcrafted in Portugal.',
    images: ['placeholder', 'placeholder', 'placeholder'],
  },
  {
    id: 'shoes-2',
    name: 'Chelsea Boots',
    category: 'shoes',
    price: 249.99,
    sizes: ['7', '8', '9', '10', '11', '12'],
    description: 'Classic Chelsea boots in premium suede. Elastic side panels.',
    images: ['placeholder', 'placeholder'],
  },
  {
    id: 'shoes-3',
    name: 'Canvas Slip-Ons',
    category: 'shoes',
    price: 79.99,
    sizes: ['7', '8', '9', '10', '11', '12'],
    description: 'Effortless slip-on style. Organic canvas upper.',
    images: ['placeholder', 'placeholder', 'placeholder'],
  },
  {
    id: 'shoes-4',
    name: 'Running Trainers',
    category: 'shoes',
    price: 169.99,
    sizes: ['7', '8', '9', '10', '11', '12'],
    description: 'Performance meets style. Lightweight mesh with responsive cushioning.',
    images: ['placeholder', 'placeholder'],
  },

  // Accessories
  {
    id: 'acc-1',
    name: 'Leather Belt',
    category: 'accessories',
    price: 79.99,
    sizes: ['S', 'M', 'L'],
    description: 'Full-grain leather belt with brushed metal buckle.',
    images: ['placeholder', 'placeholder'],
  },
  {
    id: 'acc-2',
    name: 'Canvas Tote Bag',
    category: 'accessories',
    price: 69.99,
    sizes: ['One Size'],
    description: 'Spacious tote bag in heavy canvas. Leather handles.',
    images: ['placeholder', 'placeholder', 'placeholder'],
  },
  {
    id: 'acc-3',
    name: 'Wool Beanie',
    category: 'accessories',
    price: 49.99,
    sizes: ['One Size'],
    description: 'Merino wool beanie. Soft and warm for cold days.',
    images: ['placeholder', 'placeholder'],
  },
  {
    id: 'acc-4',
    name: 'Sunglasses',
    category: 'accessories',
    price: 159.99,
    sizes: ['One Size'],
    description: 'Acetate frame sunglasses with UV protection. Timeless design.',
    images: ['placeholder', 'placeholder', 'placeholder'],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'shirts', name: 'Shirts' },
  { id: 'pants', name: 'Pants' },
  { id: 'shoes', name: 'Shoes' },
  { id: 'accessories', name: 'Accessories' },
];
