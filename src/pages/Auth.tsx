import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Auth() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [name, setName] = useState('');

  // If already logged in, show greeting and redirect option
  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <h1 className="text-4xl font-bold mb-4">{t('nav.greeting')} {user.name}!</h1>
          <p className="text-gray-600 mb-8">{t('auth.alreadySignedIn')}</p>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate('/shop')}
              className="w-full py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
            >
              {t('cart.continueShopping')}
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-4 border border-gray-300 font-medium hover:border-black transition-colors"
            >
              {t('auth.backToHome')}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">NEXUS</h1>
          <p className="text-gray-600 mt-2">{t('auth.welcome')}</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">{t('auth.yourName')}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('auth.enterName')}
                required
                autoFocus
                className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors text-lg"
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {t('auth.continue')}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          {t('auth.demoNote')}
        </p>
      </motion.div>
    </div>
  );
}
