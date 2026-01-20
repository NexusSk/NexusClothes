import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [showSizeSelect, setShowSizeSelect] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.sizes.length === 1) {
      addItem(product, product.sizes[0]);
    } else {
      setShowSizeSelect(true);
    }
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    addItem(product, size);
    setShowSizeSelect(false);
    setSelectedSize('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizeSelect(false);
      }}
    >
      <Link to={`/product/${product.id}`}>
        {/* Product Image Placeholder */}
        <div className="aspect-[3/4] bg-white border border-gray-100 rounded-lg mb-4 overflow-hidden relative">
          <div className="w-full h-full bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2" />
              <span className="text-gray-400 text-xs uppercase tracking-wider">
                {product.category}
              </span>
            </div>
          </div>

          {/* Quick Add Button */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            className="absolute bottom-4 left-4 right-4"
          >
            {!showSizeSelect ? (
              <button
                onClick={handleQuickAdd}
                className="w-full py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Quick Add
              </button>
            ) : (
              <div className="bg-white p-3 border border-gray-200 shadow-lg">
                <p className="text-xs text-gray-500 mb-2 text-center">Select Size</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSizeSelect(size);
                      }}
                      className={`px-3 py-1.5 text-xs border transition-colors ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <h3 className="font-medium text-sm group-hover:underline">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs capitalize">{product.category}</p>
          <p className="text-gray-900 text-sm font-medium">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex gap-1 pt-1">
            {product.sizes.slice(0, 4).map((size) => (
              <span
                key={size}
                className="text-xs text-gray-400"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-xs text-gray-400">+{product.sizes.length - 4}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
