import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import type { ShippingInfo, PaymentInfo } from '../types';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

export default function Checkout() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { items, getSubtotal, getShipping, getTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('cart.empty')}</h1>
          <Link to="/shop" className="text-gray-600 hover:underline">
            {t('cart.continueShopping')}
          </Link>
        </div>
      </div>
    );
  }

  const validateShipping = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!shippingInfo.firstName.trim()) newErrors.firstName = t('error.firstNameRequired');
    if (!shippingInfo.lastName.trim()) newErrors.lastName = t('error.lastNameRequired');
    if (!shippingInfo.email.trim()) newErrors.email = t('error.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) newErrors.email = t('error.invalidEmail');
    if (!shippingInfo.address.trim()) newErrors.address = t('error.addressRequired');
    if (!shippingInfo.city.trim()) newErrors.city = t('error.cityRequired');
    if (!shippingInfo.state.trim()) newErrors.state = t('error.stateRequired');
    if (!shippingInfo.zipCode.trim()) newErrors.zipCode = t('error.zipRequired');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!paymentInfo.cardNumber.trim()) newErrors.cardNumber = t('error.cardNumberRequired');
    else if (paymentInfo.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = t('error.invalidCardNumber');
    }
    if (!paymentInfo.cardName.trim()) newErrors.cardName = t('error.cardNameRequired');
    if (!paymentInfo.expiryDate.trim()) newErrors.expiryDate = t('error.expiryRequired');
    if (!paymentInfo.cvv.trim()) newErrors.cvv = t('error.cvvRequired');
    else if (paymentInfo.cvv.length < 3) newErrors.cvv = t('error.invalidCvv');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setCurrentStep('payment');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePayment()) {
      setIsProcessing(true);
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const newOrderNumber = `NX${Date.now().toString().slice(-8)}`;
      setOrderNumber(newOrderNumber);
      clearCart();
      setCurrentStep('confirmation');
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const steps = [
    { id: 'shipping', label: t('checkout.shipping') },
    { id: 'payment', label: t('checkout.payment') },
    { id: 'confirmation', label: t('checkout.confirmation') },
  ];

  const stepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    index <= stepIndex
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index < stepIndex ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    index <= stepIndex ? 'text-black' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-4 ${
                      index < stepIndex ? 'bg-black' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Shipping Step */}
          {currentStep === 'shipping' && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 rounded-lg shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-6">{t('checkout.shippingInfo')}</h2>
              <form onSubmit={handleShippingSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('checkout.firstName')}</label>
                    <input
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, firstName: e.target.value })
                      }
                      className={`w-full px-4 py-3 border ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      } focus:border-black focus:outline-none`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('checkout.lastName')}</label>
                    <input
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                      }
                      className={`w-full px-4 py-3 border ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      } focus:border-black focus:outline-none`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">{t('checkout.email')}</label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, email: e.target.value })
                      }
                      className={`w-full px-4 py-3 border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:border-black focus:outline-none`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">{t('checkout.address')}</label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, address: e.target.value })
                      }
                      className={`w-full px-4 py-3 border ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      } focus:border-black focus:outline-none`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('checkout.city')}</label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, city: e.target.value })
                      }
                      className={`w-full px-4 py-3 border ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      } focus:border-black focus:outline-none`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('checkout.state')}</label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, state: e.target.value })
                        }
                        className={`w-full px-4 py-3 border ${
                          errors.state ? 'border-red-500' : 'border-gray-300'
                        } focus:border-black focus:outline-none`}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('checkout.zipCode')}</label>
                      <input
                        type="text"
                        value={shippingInfo.zipCode}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, zipCode: e.target.value })
                        }
                        className={`w-full px-4 py-3 border ${
                          errors.zipCode ? 'border-red-500' : 'border-gray-300'
                        } focus:border-black focus:outline-none`}
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <Link
                    to="/cart"
                    className="text-sm text-gray-600 hover:text-black flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t('checkout.backToCart')}
                  </Link>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
                  >
                    {t('checkout.continueToPayment')}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Payment Step */}
          {currentStep === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 rounded-lg shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-6">{t('checkout.paymentInfo')}</h2>
              
              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>{t('cart.subtotal')}</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>{t('cart.shipping')}</span>
                  <span>{getShipping() === 0 ? t('cart.free') : `$${getShipping().toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                  <span>{t('cart.total')}</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handlePaymentSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('checkout.cardNumber')}</label>
                    <input
                      type="text"
                      value={paymentInfo.cardNumber}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cardNumber: formatCardNumber(e.target.value),
                        })
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={`w-full px-4 py-3 border ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      } focus:border-black focus:outline-none`}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('checkout.nameOnCard')}</label>
                    <input
                      type="text"
                      value={paymentInfo.cardName}
                      onChange={(e) =>
                        setPaymentInfo({ ...paymentInfo, cardName: e.target.value })
                      }
                      className={`w-full px-4 py-3 border ${
                        errors.cardName ? 'border-red-500' : 'border-gray-300'
                      } focus:border-black focus:outline-none`}
                    />
                    {errors.cardName && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('checkout.expiryDate')}</label>
                      <input
                        type="text"
                        value={paymentInfo.expiryDate}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            expiryDate: formatExpiryDate(e.target.value),
                          })
                        }
                        placeholder="MM/YY"
                        maxLength={5}
                        className={`w-full px-4 py-3 border ${
                          errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                        } focus:border-black focus:outline-none`}
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        value={paymentInfo.cvv}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cvv: e.target.value.replace(/\D/g, '').slice(0, 4),
                          })
                        }
                        placeholder="123"
                        maxLength={4}
                        className={`w-full px-4 py-3 border ${
                          errors.cvv ? 'border-red-500' : 'border-gray-300'
                        } focus:border-black focus:outline-none`}
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  {t('checkout.demoNote')}
                </p>

                <div className="mt-8 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('shipping')}
                    className="text-sm text-gray-600 hover:text-black flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t('checkout.backToShipping')}
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                  >
                    {isProcessing ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {t('checkout.processing')}
                      </>
                    ) : (
                      `${t('checkout.pay')} $${getTotal().toFixed(2)}`
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Confirmation Step */}
          {currentStep === 'confirmation' && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-lg shadow-sm text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">{t('checkout.orderConfirmed')}</h2>
              <p className="text-gray-600 mb-6">
                {t('checkout.thankYou')}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg inline-block mb-8">
                <p className="text-sm text-gray-500">{t('checkout.orderNumber')}</p>
                <p className="text-xl font-bold">{orderNumber}</p>
              </div>
              <p className="text-sm text-gray-500 mb-8">
                {t('checkout.confirmationEmail')} {shippingInfo.email}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/shop"
                  className="px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
                >
                  {t('cart.continueShopping')}
                </Link>
                <button
                  onClick={() => navigate('/')}
                  className="px-8 py-4 border border-gray-300 font-medium hover:border-black transition-colors"
                >
                  {t('auth.backToHome')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
