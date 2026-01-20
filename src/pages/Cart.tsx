import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function Cart() {
  const { t } = useLanguage();
  const { items, removeItem, updateQuantity, getSubtotal, getShipping, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4">{t('cart.empty')}</h1>
            <p className="text-gray-600 mb-8">
              {t('cart.emptyText')}
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
            >
              {t('cart.continueShopping')}
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-8"
        >
          {t('cart.title')}
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="border-b border-gray-200 pb-4 mb-4 hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
              <div className="col-span-6">{t('cart.product')}</div>
              <div className="col-span-2 text-center">{t('cart.quantity')}</div>
              <div className="col-span-2 text-right">{t('cart.price')}</div>
              <div className="col-span-2 text-right">{t('cart.total')}</div>
            </div>

            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={`${item.product.id}-${item.selectedSize}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b border-gray-100"
                >
                  {/* Product */}
                  <div className="md:col-span-6 flex gap-4">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="w-24 h-32 bg-gray-50 border border-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded" />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-medium hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500 capitalize">
                        {item.product.category}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t('cart.size')}: {item.selectedSize}
                      </p>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedSize)}
                        className="text-sm text-gray-500 hover:text-red-600 mt-2 text-left w-fit"
                      >
                        {t('cart.remove')}
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                    <div className="flex items-center border border-gray-300">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.quantity - 1
                          )
                        }
                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <span className="px-4 py-2 text-center min-w-[2.5rem] font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.quantity + 1
                          )
                        }
                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 flex items-center justify-start md:justify-end">
                    <span className="md:hidden text-gray-500 mr-2">{t('cart.price')}:</span>
                    <span>${item.product.price.toFixed(2)}</span>
                  </div>

                  {/* Total */}
                  <div className="md:col-span-2 flex items-center justify-start md:justify-end">
                    <span className="md:hidden text-gray-500 mr-2">{t('cart.total')}:</span>
                    <span className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                {t('cart.continueShopping')}
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-lg sticky top-24"
            >
              <h2 className="text-lg font-semibold mb-6">{t('cart.orderSummary')}</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('cart.subtotal')}</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('cart.shipping')}</span>
                  <span>
                    {getShipping() === 0 ? (
                      <span className="text-green-600">{t('cart.free')}</span>
                    ) : (
                      `$${getShipping().toFixed(2)}`
                    )}
                  </span>
                </div>
                {getShipping() > 0 && (
                  <p className="text-xs text-gray-500">
                    {t('cart.freeShippingNote')}
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-semibold">
                  <span>{t('cart.total')}</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full py-4 bg-black text-white text-center font-medium hover:bg-gray-800 transition-colors"
              >
                {t('cart.proceedToCheckout')}
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  {t('cart.secureCheckout')}
                </p>
                <div className="flex justify-center gap-2 mt-3">
                  <div className="w-10 h-6 bg-gray-200 rounded" />
                  <div className="w-10 h-6 bg-gray-200 rounded" />
                  <div className="w-10 h-6 bg-gray-200 rounded" />
                  <div className="w-10 h-6 bg-gray-200 rounded" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
