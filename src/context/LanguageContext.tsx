import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'sk' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Slovak translations (default)
const sk: Record<string, string> = {
  // Navbar
  'nav.home': 'Domov',
  'nav.shop': 'Obchod',
  'nav.signIn': 'Prihlásiť sa',
  'nav.signOut': 'Odhlásiť sa',
  'nav.greeting': 'Ahoj',

  // Home page
  'home.introducing': 'PREDSTAVUJEME',
  'home.tagline': 'Moderné základy pre súčasný šatník.',
  'home.tagline2': 'Vyrobené s precíznosťou, navrhnuté pre život.',
  'home.shopCollection': 'Pozrieť kolekciu',
  'home.discoverMore': 'Objaviť viac',
  'home.scroll': 'POSUNÚŤ',
  
  // About section
  'home.ourStory': 'NÁŠ PRÍBEH',
  'home.designedFor': 'Navrhnuté pre',
  'home.modernLiving': 'moderný život',
  'home.aboutText1': 'V Nexus veríme v silu jednoduchosti. Každý kúsok v našej kolekcii je starostlivo navrhnutý tak, aby sa bezproblémovo začlenil do vášho každodenného života.',
  'home.aboutText2': 'Získavame len tie najkvalitnejšie materiály a spolupracujeme s etickými výrobcami, aby sme vytvorili oblečenie, ktoré vyzerá dobre, príjemne sa nosí a rešpektuje planétu.',
  'home.exploreCollection': 'PRESKÚMAŤ KOLEKCIU',

  // Values section
  'home.whatWeStandFor': 'ZA ČÍM SI STOJÍME',
  'home.ourValues': 'Naše hodnoty',
  'home.qualityFirst': 'Kvalita na prvom mieste',
  'home.qualityDesc': 'Prémiové materiály a odborné spracovanie v každom stehu. Nikdy nekompromitujeme kvalitu.',
  'home.timelessDesign': 'Nadčasový dizajn',
  'home.timelessDesc': 'Klasické siluety, ktoré prekonávajú sezónne trendy. Kúsky, ktoré budete nosiť roky.',
  'home.sustainablePractice': 'Udržateľná prax',
  'home.sustainableDesc': 'Etická výroba s minimálnym dopadom na životné prostredie. Móda, ktorá sa stará.',

  // Featured section
  'home.newArrivals': 'NOVINKY',
  'home.featured': 'Odporúčané',
  'home.viewAllProducts': 'ZOBRAZIŤ VŠETKY PRODUKTY',
  'home.image': 'Obrázok',

  // Stats
  'home.happyCustomers': 'Spokojných zákazníkov',
  'home.sustainableMaterials': 'Udržateľné materiály',
  'home.countriesShipped': 'Krajín doručenia',
  'home.averageRating': 'Priemerné hodnotenie',

  // Newsletter
  'home.joinCommunity': 'PRIDAJTE SA KU KOMUNITE',
  'home.stayConnected': 'Zostaňte v kontakte',
  'home.newsletterText': 'Prihláste sa na odber noviniek o nových príchodoch, špeciálnych ponukách a exkluzívnom obsahu zo sveta Nexus.',
  'home.enterEmail': 'Zadajte váš email',
  'home.subscribe': 'Prihlásiť',
  'home.privacyAgreement': 'Prihlásením súhlasíte s našimi Zásadami ochrany osobných údajov',

  // Footer
  'footer.tagline': 'Moderné základy pre súčasný šatník. Vyrobené s láskou, navrhnuté pre život.',
  'footer.shop': 'Obchod',
  'footer.allProducts': 'Všetky produkty',
  'footer.shirts': 'Tričká',
  'footer.pants': 'Nohavice',
  'footer.shoes': 'Topánky',
  'footer.accessories': 'Doplnky',
  'footer.company': 'Spoločnosť',
  'footer.aboutUs': 'O nás',
  'footer.careers': 'Kariéra',
  'footer.press': 'Tlač',
  'footer.sustainability': 'Udržateľnosť',
  'footer.support': 'Podpora',
  'footer.contact': 'Kontakt',
  'footer.faq': 'Časté otázky',
  'footer.shipping': 'Doručenie',
  'footer.returns': 'Vrátenie',
  'footer.allRightsReserved': 'Všetky práva vyhradené.',
  'footer.privacyPolicy': 'Ochrana osobných údajov',
  'footer.termsOfService': 'Obchodné podmienky',

  // Shop page
  'shop.title': 'Obchod',
  'shop.products': 'produktov',
  'shop.categories': 'Kategórie',
  'shop.filter': 'Filter',
  'shop.sortBy': 'Zoradiť podľa',
  'shop.featured': 'Odporúčané',
  'shop.priceLowHigh': 'Cena: Od najnižšej',
  'shop.priceHighLow': 'Cena: Od najvyššej',
  'shop.name': 'Názov',
  'shop.noProducts': 'V tejto kategórii sa nenašli žiadne produkty.',

  // Categories
  'category.all': 'Všetky produkty',
  'category.shirts': 'Tričká',
  'category.pants': 'Nohavice',
  'category.shoes': 'Topánky',
  'category.accessories': 'Doplnky',

  // Cart page
  'cart.title': 'Nákupný košík',
  'cart.empty': 'Váš košík je prázdny',
  'cart.emptyText': 'Vyzerá to, že ste ešte nepridali žiadne položky do košíka.',
  'cart.continueShopping': 'Pokračovať v nákupe',
  'cart.product': 'Produkt',
  'cart.quantity': 'Množstvo',
  'cart.price': 'Cena',
  'cart.total': 'Celkom',
  'cart.size': 'Veľkosť',
  'cart.remove': 'Odstrániť',
  'cart.orderSummary': 'Súhrn objednávky',
  'cart.subtotal': 'Medzisúčet',
  'cart.shipping': 'Doručenie',
  'cart.free': 'Zadarmo',
  'cart.freeShippingNote': 'Doprava zadarmo pri objednávkach nad 150€',
  'cart.proceedToCheckout': 'Pokračovať k pokladni',
  'cart.secureCheckout': 'Bezpečná platba cez Stripe',

  // Product detail
  'product.notFound': 'Produkt sa nenašiel',
  'product.backToShop': 'Späť do obchodu',
  'product.size': 'Veľkosť',
  'product.sizeGuide': 'Tabuľka veľkostí',
  'product.quantity': 'Množstvo',
  'product.addToCart': 'Pridať do košíka',
  'product.addedToCart': 'Pridané do košíka',
  'product.buyNow': 'Kúpiť teraz',
  'product.freeShipping': 'Doprava zadarmo',
  'product.freeShippingNote': 'Pri objednávkach nad 150€',
  'product.easyReturns': 'Jednoduché vrátenie',
  'product.returnPolicy': '30-dňová politika vrátenia',
  'product.youMayAlsoLike': 'Mohlo by sa vám páčiť',
  'product.selectSize': 'Prosím vyberte veľkosť',

  // Auth page
  'auth.welcome': 'Vitajte! Ako sa voláte?',
  'auth.yourName': 'Vaše meno',
  'auth.enterName': 'Zadajte vaše meno',
  'auth.continue': 'Pokračovať',
  'auth.demoNote': 'Toto je demo. Stačí zadať akékoľvek meno.',
  'auth.alreadySignedIn': 'Už ste prihlásený/á.',
  'auth.backToHome': 'Späť na hlavnú stránku',

  // Checkout
  'checkout.shipping': 'Doručenie',
  'checkout.payment': 'Platba',
  'checkout.confirmation': 'Potvrdenie',
  'checkout.shippingInfo': 'Informácie o doručení',
  'checkout.firstName': 'Krstné meno',
  'checkout.lastName': 'Priezvisko',
  'checkout.email': 'Email',
  'checkout.address': 'Adresa',
  'checkout.city': 'Mesto',
  'checkout.state': 'Kraj',
  'checkout.zipCode': 'PSČ',
  'checkout.backToCart': 'Späť do košíka',
  'checkout.continueToPayment': 'Pokračovať k platbe',
  'checkout.paymentInfo': 'Platobné údaje',
  'checkout.cardNumber': 'Číslo karty',
  'checkout.nameOnCard': 'Meno na karte',
  'checkout.expiryDate': 'Dátum expirácie',
  'checkout.backToShipping': 'Späť na doručenie',
  'checkout.processing': 'Spracováva sa...',
  'checkout.pay': 'Zaplatiť',
  'checkout.demoNote': 'Toto je demo pokladňa. Žiadna skutočná platba nebude spracovaná.',
  'checkout.orderConfirmed': 'Objednávka potvrdená!',
  'checkout.thankYou': 'Ďakujeme za váš nákup. Vaša objednávka bola úspešne zadaná.',
  'checkout.orderNumber': 'Číslo objednávky',
  'checkout.confirmationEmail': 'Potvrdenie bolo odoslané na',

  // Validation errors
  'error.firstNameRequired': 'Krstné meno je povinné',
  'error.lastNameRequired': 'Priezvisko je povinné',
  'error.emailRequired': 'Email je povinný',
  'error.invalidEmail': 'Neplatný email',
  'error.addressRequired': 'Adresa je povinná',
  'error.cityRequired': 'Mesto je povinné',
  'error.stateRequired': 'Kraj je povinný',
  'error.zipRequired': 'PSČ je povinné',
  'error.cardNumberRequired': 'Číslo karty je povinné',
  'error.invalidCardNumber': 'Neplatné číslo karty',
  'error.cardNameRequired': 'Meno na karte je povinné',
  'error.expiryRequired': 'Dátum expirácie je povinný',
  'error.cvvRequired': 'CVV je povinné',
  'error.invalidCvv': 'Neplatné CVV',

  // Products (Slovak translations)
  'product.classicWhiteTee': 'Klasické biele tričko',
  'product.classicWhiteTeeDesc': 'Nadčasový základ vyrobený z prémiovej bavlny. Perfektný na každú príležitosť.',
  'product.oversizedBlackShirt': 'Oversized čierna košeľa',
  'product.oversizedBlackShirtDesc': 'Voľný strih so spustenými ramenami. Vyrobená z organickej bavlnenej zmesi.',
  'product.linenSummerShirt': 'Ľanová letná košeľa',
  'product.linenSummerShirtDesc': 'Priedušná ľanová košeľa perfektná na teplé počasie. Minimalistický dizajn.',
  'product.graphicPrintTee': 'Tričko s potlačou',
  'product.graphicPrintTeeDesc': 'Výrazný kúsok s exkluzívnou Nexus grafikou.',
  'product.slimFitChinos': 'Slim fit chino nohavice',
  'product.slimFitChinosDesc': 'Moderné slim fit chinos s elastickým komfortom. Univerzálne do práce aj na víkend.',
  'product.wideLegTrousers': 'Nohavice so širokými nohavicami',
  'product.wideLegTrousersDesc': 'Elegantná široká silueta. Vysoký pás so záhybmi vpredu.',
  'product.relaxedDenimJeans': 'Voľné džínsy',
  'product.relaxedDenimJeansDesc': 'Prémiový selvedge denim s voľným strihom. Vyrobené v Japonsku.',
  'product.cargoPants': 'Cargo nohavice',
  'product.cargoPantsDesc': 'Úžitkové cargo nohavice s viacerými vreckami. Odolný bavlnený keprovník.',
  'product.minimalistSneakers': 'Minimalistické tenisky',
  'product.minimalistSneakersDesc': 'Čisté kožené tenisky s polstrovanou podrážkou. Ručne vyrobené v Portugalsku.',
  'product.chelseaBoots': 'Chelsea čižmy',
  'product.chelseaBootsDesc': 'Klasické Chelsea čižmy z prémiovej semišovej kože. Elastické bočné panely.',
  'product.canvasSlipOns': 'Plátenné slip-on topánky',
  'product.canvasSlipOnsDesc': 'Nenáročný slip-on štýl. Organický plátenný zvršok.',
  'product.runningTrainers': 'Bežecké tenisky',
  'product.runningTrainersDesc': 'Výkon stretáva štýl. Ľahká sieťovina s citlivým tlmením.',
  'product.leatherBelt': 'Kožený opasok',
  'product.leatherBeltDesc': 'Opasok z plnozrnnej kože s brúsenou kovovou prackou.',
  'product.canvasToteBag': 'Plátenná taška tote',
  'product.canvasToteBagDesc': 'Priestranná taška z pevného plátna. Kožené rúčky.',
  'product.woolBeanie': 'Vlnená čiapka',
  'product.woolBeanieDesc': 'Čiapka z merino vlny. Mäkká a teplá na chladné dni.',
  'product.sunglasses': 'Slnečné okuliare',
  'product.sunglassesDesc': 'Slnečné okuliare s acetátovým rámom a UV ochranou. Nadčasový dizajn.',
};

// English translations
const en: Record<string, string> = {
  // Navbar
  'nav.home': 'Home',
  'nav.shop': 'Shop',
  'nav.signIn': 'Sign In',
  'nav.signOut': 'Sign Out',
  'nav.greeting': 'Hey',

  // Home page
  'home.introducing': 'INTRODUCING',
  'home.tagline': 'Modern essentials for the contemporary wardrobe.',
  'home.tagline2': 'Crafted with precision, designed for life.',
  'home.shopCollection': 'Shop Collection',
  'home.discoverMore': 'Discover More',
  'home.scroll': 'SCROLL',

  // About section
  'home.ourStory': 'OUR STORY',
  'home.designedFor': 'Designed for',
  'home.modernLiving': 'Modern Living',
  'home.aboutText1': 'At Nexus, we believe in the power of simplicity. Every piece in our collection is thoughtfully designed to blend seamlessly into your everyday life.',
  'home.aboutText2': 'We source only the finest materials and partner with ethical manufacturers to create clothing that looks good, feels great, and does right by the planet.',
  'home.exploreCollection': 'EXPLORE COLLECTION',

  // Values section
  'home.whatWeStandFor': 'WHAT WE STAND FOR',
  'home.ourValues': 'Our Values',
  'home.qualityFirst': 'Quality First',
  'home.qualityDesc': 'Premium materials and expert craftsmanship in every stitch. We never compromise on quality.',
  'home.timelessDesign': 'Timeless Design',
  'home.timelessDesc': 'Classic silhouettes that transcend seasonal trends. Pieces you\'ll wear for years.',
  'home.sustainablePractice': 'Sustainable Practice',
  'home.sustainableDesc': 'Ethical production with minimal environmental impact. Fashion that cares.',

  // Featured section
  'home.newArrivals': 'NEW ARRIVALS',
  'home.featured': 'Featured',
  'home.viewAllProducts': 'VIEW ALL PRODUCTS',
  'home.image': 'Image',

  // Stats
  'home.happyCustomers': 'Happy Customers',
  'home.sustainableMaterials': 'Sustainable Materials',
  'home.countriesShipped': 'Countries Shipped',
  'home.averageRating': 'Average Rating',

  // Newsletter
  'home.joinCommunity': 'JOIN THE COMMUNITY',
  'home.stayConnected': 'Stay Connected',
  'home.newsletterText': 'Subscribe to receive updates on new arrivals, special offers, and exclusive content from the Nexus world.',
  'home.enterEmail': 'Enter your email',
  'home.subscribe': 'Subscribe',
  'home.privacyAgreement': 'By subscribing, you agree to our Privacy Policy',

  // Footer
  'footer.tagline': 'Modern essentials for the contemporary wardrobe. Crafted with care, designed for life.',
  'footer.shop': 'Shop',
  'footer.allProducts': 'All Products',
  'footer.shirts': 'Shirts',
  'footer.pants': 'Pants',
  'footer.shoes': 'Shoes',
  'footer.accessories': 'Accessories',
  'footer.company': 'Company',
  'footer.aboutUs': 'About Us',
  'footer.careers': 'Careers',
  'footer.press': 'Press',
  'footer.sustainability': 'Sustainability',
  'footer.support': 'Support',
  'footer.contact': 'Contact',
  'footer.faq': 'FAQ',
  'footer.shipping': 'Shipping',
  'footer.returns': 'Returns',
  'footer.allRightsReserved': 'All rights reserved.',
  'footer.privacyPolicy': 'Privacy Policy',
  'footer.termsOfService': 'Terms of Service',

  // Shop page
  'shop.title': 'Shop',
  'shop.products': 'products',
  'shop.categories': 'Categories',
  'shop.filter': 'Filter',
  'shop.sortBy': 'Sort by',
  'shop.featured': 'Featured',
  'shop.priceLowHigh': 'Price: Low to High',
  'shop.priceHighLow': 'Price: High to Low',
  'shop.name': 'Name',
  'shop.noProducts': 'No products found in this category.',

  // Categories
  'category.all': 'All Products',
  'category.shirts': 'Shirts',
  'category.pants': 'Pants',
  'category.shoes': 'Shoes',
  'category.accessories': 'Accessories',

  // Cart page
  'cart.title': 'Shopping Cart',
  'cart.empty': 'Your cart is empty',
  'cart.emptyText': 'Looks like you haven\'t added any items to your cart yet.',
  'cart.continueShopping': 'Continue Shopping',
  'cart.product': 'Product',
  'cart.quantity': 'Quantity',
  'cart.price': 'Price',
  'cart.total': 'Total',
  'cart.size': 'Size',
  'cart.remove': 'Remove',
  'cart.orderSummary': 'Order Summary',
  'cart.subtotal': 'Subtotal',
  'cart.shipping': 'Shipping',
  'cart.free': 'Free',
  'cart.freeShippingNote': 'Free shipping on orders over $150',
  'cart.proceedToCheckout': 'Proceed to Checkout',
  'cart.secureCheckout': 'Secure checkout powered by Stripe',

  // Product detail
  'product.notFound': 'Product not found',
  'product.backToShop': 'Back to shop',
  'product.size': 'Size',
  'product.sizeGuide': 'Size Guide',
  'product.quantity': 'Quantity',
  'product.addToCart': 'Add to Cart',
  'product.addedToCart': 'Added to Cart',
  'product.buyNow': 'Buy Now',
  'product.freeShipping': 'Free Shipping',
  'product.freeShippingNote': 'On orders over $150',
  'product.easyReturns': 'Easy Returns',
  'product.returnPolicy': '30-day return policy',
  'product.youMayAlsoLike': 'You May Also Like',
  'product.selectSize': 'Please select a size',

  // Auth page
  'auth.welcome': 'Welcome! What\'s your name?',
  'auth.yourName': 'Your Name',
  'auth.enterName': 'Enter your name',
  'auth.continue': 'Continue',
  'auth.demoNote': 'This is a demo. Just enter any name to continue.',
  'auth.alreadySignedIn': 'You\'re already signed in.',
  'auth.backToHome': 'Back to Home',

  // Checkout
  'checkout.shipping': 'Shipping',
  'checkout.payment': 'Payment',
  'checkout.confirmation': 'Confirmation',
  'checkout.shippingInfo': 'Shipping Information',
  'checkout.firstName': 'First Name',
  'checkout.lastName': 'Last Name',
  'checkout.email': 'Email',
  'checkout.address': 'Address',
  'checkout.city': 'City',
  'checkout.state': 'State',
  'checkout.zipCode': 'ZIP Code',
  'checkout.backToCart': 'Back to Cart',
  'checkout.continueToPayment': 'Continue to Payment',
  'checkout.paymentInfo': 'Payment Information',
  'checkout.cardNumber': 'Card Number',
  'checkout.nameOnCard': 'Name on Card',
  'checkout.expiryDate': 'Expiry Date',
  'checkout.backToShipping': 'Back to Shipping',
  'checkout.processing': 'Processing...',
  'checkout.pay': 'Pay',
  'checkout.demoNote': 'This is a demo checkout. No real payment will be processed.',
  'checkout.orderConfirmed': 'Order Confirmed!',
  'checkout.thankYou': 'Thank you for your purchase. Your order has been placed successfully.',
  'checkout.orderNumber': 'Order Number',
  'checkout.confirmationEmail': 'A confirmation email has been sent to',

  // Validation errors
  'error.firstNameRequired': 'First name is required',
  'error.lastNameRequired': 'Last name is required',
  'error.emailRequired': 'Email is required',
  'error.invalidEmail': 'Invalid email',
  'error.addressRequired': 'Address is required',
  'error.cityRequired': 'City is required',
  'error.stateRequired': 'State is required',
  'error.zipRequired': 'ZIP code is required',
  'error.cardNumberRequired': 'Card number is required',
  'error.invalidCardNumber': 'Invalid card number',
  'error.cardNameRequired': 'Name on card is required',
  'error.expiryRequired': 'Expiry date is required',
  'error.cvvRequired': 'CVV is required',
  'error.invalidCvv': 'Invalid CVV',

  // Products (English - original)
  'product.classicWhiteTee': 'Classic White Tee',
  'product.classicWhiteTeeDesc': 'A timeless essential crafted from premium cotton. Perfect for any occasion.',
  'product.oversizedBlackShirt': 'Oversized Black Shirt',
  'product.oversizedBlackShirtDesc': 'Relaxed fit with dropped shoulders. Made from organic cotton blend.',
  'product.linenSummerShirt': 'Linen Summer Shirt',
  'product.linenSummerShirtDesc': 'Breathable linen shirt perfect for warm weather. Minimalist design.',
  'product.graphicPrintTee': 'Graphic Print Tee',
  'product.graphicPrintTeeDesc': 'Bold statement piece with exclusive Nexus artwork.',
  'product.slimFitChinos': 'Slim Fit Chinos',
  'product.slimFitChinosDesc': 'Modern slim fit chinos with stretch comfort. Versatile for work or weekend.',
  'product.wideLegTrousers': 'Wide Leg Trousers',
  'product.wideLegTrousersDesc': 'Elevated wide leg silhouette. High-waisted with pleated front.',
  'product.relaxedDenimJeans': 'Relaxed Denim Jeans',
  'product.relaxedDenimJeansDesc': 'Premium selvedge denim with relaxed fit. Crafted in Japan.',
  'product.cargoPants': 'Cargo Pants',
  'product.cargoPantsDesc': 'Utility-inspired cargo pants with multiple pockets. Durable cotton twill.',
  'product.minimalistSneakers': 'Minimalist Sneakers',
  'product.minimalistSneakersDesc': 'Clean leather sneakers with cushioned sole. Handcrafted in Portugal.',
  'product.chelseaBoots': 'Chelsea Boots',
  'product.chelseaBootsDesc': 'Classic Chelsea boots in premium suede. Elastic side panels.',
  'product.canvasSlipOns': 'Canvas Slip-Ons',
  'product.canvasSlipOnsDesc': 'Effortless slip-on style. Organic canvas upper.',
  'product.runningTrainers': 'Running Trainers',
  'product.runningTrainersDesc': 'Performance meets style. Lightweight mesh with responsive cushioning.',
  'product.leatherBelt': 'Leather Belt',
  'product.leatherBeltDesc': 'Full-grain leather belt with brushed metal buckle.',
  'product.canvasToteBag': 'Canvas Tote Bag',
  'product.canvasToteBagDesc': 'Spacious tote bag in heavy canvas. Leather handles.',
  'product.woolBeanie': 'Wool Beanie',
  'product.woolBeanieDesc': 'Merino wool beanie. Soft and warm for cold days.',
  'product.sunglasses': 'Sunglasses',
  'product.sunglassesDesc': 'Acetate frame sunglasses with UV protection. Timeless design.',
};

const translations: Record<Language, Record<string, string>> = { sk, en };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('nexus-language');
    return (saved as Language) || 'sk';
  });

  useEffect(() => {
    localStorage.setItem('nexus-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
