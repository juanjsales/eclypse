import React, { createContext, useContext, useState, useEffect } from 'react';

const I18nContext = createContext();

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Translation data
const translations = {
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.contact': 'Contacto',
    'nav.profile': 'Perfil',
    'nav.login': 'Entrar',
    'nav.blog': 'Blog',
    'nav.cart': 'Carrinho',
    
    // Common
    'common.loading': 'A carregar...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.add': 'Adicionar',
    'common.remove': 'Remover',
    'common.search': 'Pesquisar',
    'common.filter': 'Filtrar',
    'common.all': 'Todos',
    'common.price': 'Preço',
    'common.quantity': 'Quantidade',
    'common.total': 'Total',
    'common.subtotal': 'Subtotal',
    'common.shipping': 'Envio',
    'common.tax': 'IVA',
    'common.free': 'Grátis',
    
    // Products
    'products.title': 'Coleção',
    'products.featured': 'Destaques',
    'products.addToCart': 'Adicionar ao Carrinho',
    'products.outOfStock': 'Esgotado',
    'products.inStock': 'Em Stock',
    'products.lowStock': 'Stock Limitado',
    'products.viewDetails': 'Ver Detalhes',
    'products.relatedProducts': 'Produtos Relacionados',
    
    // Cart
    'cart.title': 'Carrinho de Compras',
    'cart.empty': 'O seu carrinho está vazio',
    'cart.continueShopping': 'Continuar a Comprar',
    'cart.checkout': 'Finalizar Compra',
    'cart.itemAdded': 'Produto adicionado ao carrinho',
    'cart.itemRemoved': 'Produto removido do carrinho',
    
    // Authentication
    'auth.login': 'Entrar',
    'auth.register': 'Registar',
    'auth.logout': 'Sair',
    'auth.email': 'Email',
    'auth.password': 'Palavra-passe',
    'auth.confirmPassword': 'Confirmar Palavra-passe',
    'auth.name': 'Nome',
    'auth.loginSuccess': 'Login realizado com sucesso',
    'auth.registerSuccess': 'Conta criada com sucesso',
    'auth.loginError': 'Email ou palavra-passe incorretos',
    'auth.registerError': 'Erro ao criar conta',
    
    // Profile
    'profile.title': 'Minha Conta',
    'profile.info': 'Informações do Perfil',
    'profile.favorites': 'Favoritos',
    'profile.orders': 'Encomendas',
    'profile.settings': 'Definições',
    'profile.updateSuccess': 'Perfil atualizado com sucesso',
    
    // Checkout
    'checkout.title': 'Finalizar Compra',
    'checkout.shipping': 'Informações de Envio',
    'checkout.payment': 'Método de Pagamento',
    'checkout.review': 'Rever Encomenda',
    'checkout.placeOrder': 'Finalizar Encomenda',
    'checkout.orderSuccess': 'Encomenda realizada com sucesso',
    
    // Blog
    'blog.title': 'Blog Eclypse',
    'blog.readMore': 'Ler Mais',
    'blog.backToBlog': 'Voltar ao Blog',
    'blog.relatedPosts': 'Artigos Relacionados',
    'blog.categories': 'Categorias',
    'blog.tags': 'Tags',
    
    // About
    'about.slowFashion': 'slow fashion',
    'about.handmade': 'Arte com as mãos',
    'about.philosophy': 'Entre o clarão e a sombra',
    'about.invisible': 'O invisível molda o visível',
    
    // Contact
    'contact.title': 'Contacto',
    'contact.getInTouch': 'Entre em Contacto',
    'contact.name': 'Nome',
    'contact.message': 'Mensagem',
    'contact.send': 'Enviar Mensagem',
    'contact.success': 'Mensagem enviada com sucesso',
    
    // Footer
    'footer.rights': 'Todos os direitos reservados',
    'footer.about': 'Sobre Nós',
    'footer.privacy': 'Privacidade',
    'footer.terms': 'Termos',
    
    // Currency
    'currency.symbol': '€',
    'currency.name': 'Euro'
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.contact': 'Contact',
    'nav.profile': 'Profile',
    'nav.login': 'Login',
    'nav.blog': 'Blog',
    'nav.cart': 'Cart',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.remove': 'Remove',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.price': 'Price',
    'common.quantity': 'Quantity',
    'common.total': 'Total',
    'common.subtotal': 'Subtotal',
    'common.shipping': 'Shipping',
    'common.tax': 'Tax',
    'common.free': 'Free',
    
    // Products
    'products.title': 'Collection',
    'products.featured': 'Featured',
    'products.addToCart': 'Add to Cart',
    'products.outOfStock': 'Out of Stock',
    'products.inStock': 'In Stock',
    'products.lowStock': 'Limited Stock',
    'products.viewDetails': 'View Details',
    'products.relatedProducts': 'Related Products',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.continueShopping': 'Continue Shopping',
    'cart.checkout': 'Checkout',
    'cart.itemAdded': 'Item added to cart',
    'cart.itemRemoved': 'Item removed from cart',
    
    // Authentication
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.logout': 'Logout',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.name': 'Name',
    'auth.loginSuccess': 'Login successful',
    'auth.registerSuccess': 'Account created successfully',
    'auth.loginError': 'Invalid email or password',
    'auth.registerError': 'Error creating account',
    
    // Profile
    'profile.title': 'My Account',
    'profile.info': 'Profile Information',
    'profile.favorites': 'Favorites',
    'profile.orders': 'Orders',
    'profile.settings': 'Settings',
    'profile.updateSuccess': 'Profile updated successfully',
    
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.shipping': 'Shipping Information',
    'checkout.payment': 'Payment Method',
    'checkout.review': 'Review Order',
    'checkout.placeOrder': 'Place Order',
    'checkout.orderSuccess': 'Order placed successfully',
    
    // Blog
    'blog.title': 'Eclypse Blog',
    'blog.readMore': 'Read More',
    'blog.backToBlog': 'Back to Blog',
    'blog.relatedPosts': 'Related Posts',
    'blog.categories': 'Categories',
    'blog.tags': 'Tags',
    
    // About
    'about.slowFashion': 'slow fashion',
    'about.handmade': 'Handmade art',
    'about.philosophy': 'Between light and shadow',
    'about.invisible': 'The invisible shapes the visible',
    
    // Contact
    'contact.title': 'Contact',
    'contact.getInTouch': 'Get in Touch',
    'contact.name': 'Name',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.success': 'Message sent successfully',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.about': 'About Us',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    
    // Currency
    'currency.symbol': '€',
    'currency.name': 'Euro'
  },
  
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.contact': 'Contacto',
    'nav.profile': 'Perfil',
    'nav.login': 'Iniciar Sesión',
    'nav.blog': 'Blog',
    'nav.cart': 'Carrito',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.add': 'Añadir',
    'common.remove': 'Quitar',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.all': 'Todos',
    'common.price': 'Precio',
    'common.quantity': 'Cantidad',
    'common.total': 'Total',
    'common.subtotal': 'Subtotal',
    'common.shipping': 'Envío',
    'common.tax': 'IVA',
    'common.free': 'Gratis',
    
    // Products
    'products.title': 'Colección',
    'products.featured': 'Destacados',
    'products.addToCart': 'Añadir al Carrito',
    'products.outOfStock': 'Agotado',
    'products.inStock': 'En Stock',
    'products.lowStock': 'Stock Limitado',
    'products.viewDetails': 'Ver Detalles',
    'products.relatedProducts': 'Productos Relacionados',
    
    // Cart
    'cart.title': 'Carrito de Compras',
    'cart.empty': 'Tu carrito está vacío',
    'cart.continueShopping': 'Seguir Comprando',
    'cart.checkout': 'Finalizar Compra',
    'cart.itemAdded': 'Producto añadido al carrito',
    'cart.itemRemoved': 'Producto eliminado del carrito',
    
    // Authentication
    'auth.login': 'Iniciar Sesión',
    'auth.register': 'Registrarse',
    'auth.logout': 'Cerrar Sesión',
    'auth.email': 'Email',
    'auth.password': 'Contraseña',
    'auth.confirmPassword': 'Confirmar Contraseña',
    'auth.name': 'Nombre',
    'auth.loginSuccess': 'Inicio de sesión exitoso',
    'auth.registerSuccess': 'Cuenta creada exitosamente',
    'auth.loginError': 'Email o contraseña incorrectos',
    'auth.registerError': 'Error al crear cuenta',
    
    // Profile
    'profile.title': 'Mi Cuenta',
    'profile.info': 'Información del Perfil',
    'profile.favorites': 'Favoritos',
    'profile.orders': 'Pedidos',
    'profile.settings': 'Configuración',
    'profile.updateSuccess': 'Perfil actualizado exitosamente',
    
    // Checkout
    'checkout.title': 'Finalizar Compra',
    'checkout.shipping': 'Información de Envío',
    'checkout.payment': 'Método de Pago',
    'checkout.review': 'Revisar Pedido',
    'checkout.placeOrder': 'Realizar Pedido',
    'checkout.orderSuccess': 'Pedido realizado exitosamente',
    
    // Blog
    'blog.title': 'Blog Eclypse',
    'blog.readMore': 'Leer Más',
    'blog.backToBlog': 'Volver al Blog',
    'blog.relatedPosts': 'Artículos Relacionados',
    'blog.categories': 'Categorías',
    'blog.tags': 'Etiquetas',
    
    // About
    'about.slowFashion': 'moda lenta',
    'about.handmade': 'Arte con las manos',
    'about.philosophy': 'Entre la luz y la sombra',
    'about.invisible': 'Lo invisible moldea lo visible',
    
    // Contact
    'contact.title': 'Contacto',
    'contact.getInTouch': 'Ponte en Contacto',
    'contact.name': 'Nombre',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.success': 'Mensaje enviado exitosamente',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados',
    'footer.about': 'Acerca de',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    
    // Currency
    'currency.symbol': '€',
    'currency.name': 'Euro'
  }
};

const supportedLanguages = [
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

export function I18nProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('pt');
  const [isLoading, setIsLoading] = useState(false);

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('eclypse-language');
    if (savedLanguage && supportedLanguages.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLanguage = navigator.language.split('-')[0];
      if (supportedLanguages.find(lang => lang.code === browserLanguage)) {
        setCurrentLanguage(browserLanguage);
      }
    }
  }, []);

  const changeLanguage = async (languageCode) => {
    if (languageCode === currentLanguage) return;
    
    setIsLoading(true);
    
    // Simulate loading time for language change
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentLanguage(languageCode);
    localStorage.setItem('eclypse-language', languageCode);
    
    setIsLoading(false);
  };

  const t = (key, params = {}) => {
    let translation = translations[currentLanguage]?.[key] || translations['pt'][key] || key;
    
    // Replace parameters in translation
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{{${param}}}`, params[param]);
    });
    
    return translation;
  };

  const formatCurrency = (amount, options = {}) => {
    const { showSymbol = true, decimals = 2 } = options;
    const symbol = t('currency.symbol');
    const formattedAmount = parseFloat(amount).toFixed(decimals);
    
    if (currentLanguage === 'en') {
      return showSymbol ? `${symbol}${formattedAmount}` : formattedAmount;
    } else {
      return showSymbol ? `${formattedAmount}${symbol}` : formattedAmount;
    }
  };

  const formatDate = (date, options = {}) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const localeMap = {
      'pt': 'pt-PT',
      'en': 'en-GB',
      'es': 'es-ES'
    };
    
    return dateObj.toLocaleDateString(localeMap[currentLanguage] || 'pt-PT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    });
  };

  const getCurrentLanguage = () => {
    return supportedLanguages.find(lang => lang.code === currentLanguage);
  };

  const isRTL = () => {
    // Add RTL languages here if needed
    const rtlLanguages = ['ar', 'he', 'fa'];
    return rtlLanguages.includes(currentLanguage);
  };

  const value = {
    currentLanguage,
    supportedLanguages,
    changeLanguage,
    isLoading,
    t,
    formatCurrency,
    formatDate,
    getCurrentLanguage,
    isRTL
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}
