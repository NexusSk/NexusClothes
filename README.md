# NEXUS - Modern Clothing Brand Website

A feature-rich dummy template website for a clothing brand, showcasing modern web development skills with React, Three.js, and Tailwind CSS.

## Features

- **3D Hero Animation** - Interactive Three.js scene with floating geometric shapes
- **Product Catalog** - Browse products with category filters and sorting
- **Shopping Cart** - Full cart functionality with quantity management
- **Checkout Flow** - Multi-step checkout with form validation
- **User Authentication** - Sign in/Sign up with localStorage persistence
- **Responsive Design** - Fully responsive across all devices
- **Smooth Animations** - Framer Motion powered transitions

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Three.js / React Three Fiber** - 3D graphics
- **Framer Motion** - Animations
- **React Router v6** - Routing

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/      # Navbar, Footer, Layout
│   ├── products/    # ProductCard
│   ├── three/       # Three.js 3D scene
│   └── ui/          # Reusable UI components
├── context/
│   ├── AuthContext  # Authentication state
│   └── CartContext  # Shopping cart state
├── data/
│   └── products.ts  # Product catalog data
├── pages/
│   ├── Home         # Landing page with 3D hero
│   ├── Shop         # Product listing
│   ├── ProductDetail# Single product view
│   ├── Cart         # Shopping cart
│   ├── Checkout     # Multi-step checkout
│   └── Auth         # Sign in/Sign up
├── types/           # TypeScript definitions
├── App.tsx          # Main app with routing
└── main.tsx         # Entry point
```

## Pages Overview

### Home
- Full-screen hero with animated 3D Three.js scene
- Brand story and values sections
- Featured products carousel
- Newsletter signup

### Shop
- Product grid with white placeholder images
- Category filter sidebar
- Sort by price/name
- Quick add to cart on hover

### Product Detail
- Large product images (placeholders)
- Size selector
- Quantity picker
- Add to cart / Buy now buttons
- Related products

### Cart
- Item list with quantity controls
- Remove items
- Order summary with shipping calculation
- Proceed to checkout

### Checkout
- Multi-step form (Shipping → Payment → Confirmation)
- Form validation
- Dummy payment processing
- Order confirmation with order number

### Authentication
- Sign in / Sign up tabs
- Form validation
- localStorage-based persistence
- Social login buttons (UI only)

## Customization

### Adding Products
Edit `src/data/products.ts` to add or modify products:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  category: 'shirts' | 'pants' | 'shoes' | 'accessories',
  price: 99.99,
  sizes: ['S', 'M', 'L'],
  description: 'Product description',
  images: ['placeholder'],
}
```

### Adding Real Images
Replace the placeholder divs in `ProductCard.tsx` and `ProductDetail.tsx` with actual `<img>` tags pointing to your image files.

### Colors
Customize the color palette in `src/index.css` under the `@theme` block.

## Notes

This is a **demo/template** website:
- No real payment processing
- Authentication is localStorage-based only
- Product images are placeholders
- Email subscriptions are not connected

## License

MIT
