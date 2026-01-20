import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ClothingScene from '../components/three/ClothingScene';
import FloatingElements from '../components/three/FloatingElements';
import { products } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" style={{ zIndex: -1 }} />
      
      {/* 3D Scene */}
      <ClothingScene />
      
      <div className="relative text-center px-4" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block text-sm font-medium tracking-[0.3em] text-gray-500 mb-4"
          >
            {t('home.introducing')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6"
          >
            NEXUS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            {t('home.tagline')}
            <br className="hidden sm:block" />
            {t('home.tagline2')}
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/shop"
            className="group inline-flex items-center justify-center px-10 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105"
          >
            {t('home.shopCollection')}
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <a
            href="#about"
            className="inline-flex items-center justify-center px-10 py-4 border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            {t('home.discoverMore')}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 tracking-widest">{t('home.scroll')}</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
            <motion.div 
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  return (
    <section id="about" ref={ref} className="py-32 bg-gray-50 relative overflow-hidden">
      <FloatingElements className="opacity-30" />
      
      <motion.div
        style={{ opacity, y, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-medium tracking-[0.2em] text-gray-400 mb-4 block"
            >
              {t('home.ourStory')}
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {t('home.designedFor')}
              <br />
              <span className="text-gray-400">{t('home.modernLiving')}</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {t('home.aboutText1')}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {t('home.aboutText2')}
            </p>
            <Link 
              to="/shop"
              className="inline-flex items-center text-sm font-medium tracking-wide hover:underline"
            >
              {t('home.exploreCollection')}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="aspect-[3/4] bg-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="aspect-[3/4] bg-gray-300 rounded-2xl mt-12 overflow-hidden"
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ValuesSection() {
  const { t } = useLanguage();
  
  const values = [
    {
      number: '01',
      title: t('home.qualityFirst'),
      description: t('home.qualityDesc'),
    },
    {
      number: '02',
      title: t('home.timelessDesign'),
      description: t('home.timelessDesc'),
    },
    {
      number: '03',
      title: t('home.sustainablePractice'),
      description: t('home.sustainableDesc'),
    },
  ];

  return (
    <section className="py-32 bg-black text-white relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium tracking-[0.2em] text-gray-500 mb-4 block">
            {t('home.whatWeStandFor')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {t('home.ourValues')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {values.map((value, index) => (
            <motion.div
              key={value.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="border-t border-gray-800 pt-8">
                <span className="text-5xl font-bold text-gray-800 group-hover:text-gray-600 transition-colors">
                  {value.number}
                </span>
                <h3 className="text-2xl font-semibold mt-6 mb-4">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const { t } = useLanguage();
  const featured = products.slice(0, 4);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32 relative overflow-hidden">
      <FloatingElements className="opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div>
            <span className="text-sm font-medium tracking-[0.2em] text-gray-400 mb-4 block">
              {t('home.newArrivals')}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t('home.featured')}
            </h2>
          </div>
          <Link
            to="/shop"
            className="group inline-flex items-center text-sm font-medium tracking-wide hover:underline"
          >
            {t('home.viewAllProducts')}
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>

        <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/product/${product.id}`} className="group block">
                <div className="aspect-[3/4] bg-gray-100 rounded-2xl mb-4 overflow-hidden relative">
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                    <span className="text-gray-300 text-xs uppercase tracking-wider">{t('home.image')}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
                <h3 className="font-medium mb-1 group-hover:underline">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm">${product.price.toFixed(2)}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const { t } = useLanguage();
  
  const stats = [
    { value: '50K+', label: t('home.happyCustomers') },
    { value: '100%', label: t('home.sustainableMaterials') },
    { value: '30+', label: t('home.countriesShipped') },
    { value: '5 Star', label: t('home.averageRating') },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-sm font-medium tracking-[0.2em] text-gray-400 mb-4 block">
            {t('home.joinCommunity')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {t('home.stayConnected')}
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            {t('home.newsletterText')}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thanks for subscribing! (This is a demo)');
            }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder={t('home.enterEmail')}
              required
              className="flex-1 px-6 py-4 bg-white border border-gray-200 focus:border-black focus:outline-none transition-colors rounded-full"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors rounded-full"
            >
              {t('home.subscribe')}
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4">
            {t('home.privacyAgreement')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <FeaturedProducts />
      <StatsSection />
      <NewsletterSection />
    </>
  );
}
