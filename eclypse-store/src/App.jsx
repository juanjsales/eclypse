import React, { useState, useEffect } from 'react';
import { ShoppingCart, Sun, Moon, Search, X, Star, Filter, Grid, List } from 'lucide-react';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { ProductModal } from './components/ProductModal';
import productsData from './products'; // Importar os produtos do ficheiro products.js
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [viewMode, setViewMode] = useState('grid');
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('eclypse-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('eclypse-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        addToast(`Quantidade de ${product.name} atualizada no carrinho!`, 'success');
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        addToast(`${product.name} adicionado ao carrinho!`, 'success');
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    addToast('Item removido do carrinho!', 'info');
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity: quantity } : item))
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };
  
  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // 1. Formatar a lista de itens
    const itemsText = cartItems.map(item =>
      `${item.quantity}x ${item.name} (Ref: ${item.id}) @€${item.price.toFixed(2)}`
    ).join('\n');

    // 2. Calcular total
    const total = calculateTotal();
    
    // 3. Montar a mensagem
    const message = 
      `Olá, gostaria de finalizar a minha compra na Eclypse!%0A%0A` +
      `*Detalhes do Pedido:*%0A${itemsText}%0A%0A` +
      `*Total:* €${total}%0A%0A` +
      `Agradeço a confirmação e detalhes de pagamento/envio.`;

    // 4. Configurar o número de telefone (!!! SUBSTITUA COM O SEU NÚMERO REAL, INCLUINDO CÓDIGO DO PAÍS !!!)
    const phoneNumber = '351910000000'; 
    
    // 5. Criar o URL e redirecionar
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // 6. Limpar o carrinho e mostrar notificação
    setCartItems([]); 
    addToast('Pedido iniciado! Redirecionando para o WhatsApp.', 'success');
  };


  const categories = ['Todos', ...new Set(productsData.map(product => product.category))];

  const featuredProducts = productsData.slice(0, 3); // Seleciona os 3 primeiros produtos como destaque

  const filteredProducts = productsData.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'Todos' || product.category === selectedCategory)
  );

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b border-border">
        {/* Título com o novo estilo gradiente (text-eclipse) */}
        <h1 className="text-4xl font-extrabold text-eclipse">Eclypse</h1>
        <nav className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Pesquisar produtos..."
              className="pl-10 pr-4 py-2 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                onClick={() => setSearchTerm('')}
              >
                <X size={16} />
              </Button>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:w-[400px] flex flex-col">
              <SheetHeader>
                <SheetTitle className="text-2xl">Carrinho de Compras</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto py-4">
                {cartItems.length === 0 ? (
                  <p className="text-center text-muted-foreground">O seu carrinho está vazio.</p>
                ) : (
                  <ul className="space-y-4">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-muted-foreground text-sm">€{item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                            <X size={16} />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {cartItems.length > 0 && (
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>€{calculateTotal()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Envio: Grátis</p>
                  <Button className="w-full mt-4" onClick={handleCheckout}>Finalizar Compra</Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">

         {/* Secção "Sobre Nós" - Com Animação de Entrada (animate-fade-in-up) */}
        <section className="py-20 mb-12 bg-gradient-to-br from-card/50 to-background/50 border-y border-primary/20 shadow-xl animate-fade-in-up">
          <h2 className="text-5xl font-extrabold text-center mb-10 text-primary">Sobre a Eclypse</h2>
          <div className="max-w-4xl mx-auto text-center text-xl text-muted-foreground leading-relaxed px-4">
            <p className="mb-6">
              Na Eclypse, acreditamos que a moda deve ser uma expressão de arte e consciência. Somos uma marca de <strong className="text-foreground text-2xl font-black">SLOW FASHION</strong>, dedicada a criar peças únicas e intemporais, feitas com paixão e <strong className="text-foreground text-2xl font-black">ARTE COM AS MÃOS</strong>.
            </p>
            <div className="h-0.5 w-24 bg-primary mx-auto my-8"></div>
            <p className="mb-6">
              A nossa inspiração vem da dualidade entre a luz e a sombra, refletida nos fenómenos celestiais. Cada peça é um convite a explorar a beleza do contraste e a profundidade do universo.
            </p>
            <p className="font-bold text-2xl text-primary mt-8">
              O invisível molda o visível.
            </p>
          </div>
        </section>
        {/* Secção de Destaques/Novidades */}
        <section className="mb-12">
          <h2 className="text-4xl font-extrabold text-center mb-8">Destaques</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden shadow-lg transition-shadow duration-300 cursor-pointer card-eclipse"
                onClick={() => openProductModal(product)}
              >
                <CardHeader className="p-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl font-semibold mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-muted-foreground text-sm line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4 pt-0">
                    {/* Botão com as classes relative e btn-eclipse */}
                  <span className="text-2xl font-bold">€{product.price.toFixed(2)}</span>
                  <Button 
                        className="relative btn-eclipse"
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    >
                        Adicionar
                    </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-4xl font-extrabold text-center mb-8">Coleção ({filteredProducts.length} produtos)</h2>
          <div className="flex justify-center mb-8 space-x-4">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden shadow-lg transition-shadow duration-300 cursor-pointer card-eclipse"
                onClick={() => openProductModal(product)}
              >
                <CardHeader className="p-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl font-semibold mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-muted-foreground text-sm line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4 pt-0">
                    {/* Botão com as classes relative e btn-eclipse */}
                  <span className="text-2xl font-bold">€{product.price.toFixed(2)}</span>
                  <Button 
                        className="relative btn-eclipse"
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    >
                        Adicionar
                    </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

       
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-muted-foreground border-t border-border">
        <p>&copy; {new Date().getFullYear()} Eclypse. Todos os direitos reservados.</p>
      </footer>

      <ProductModal
        isOpen={isModalOpen}
        onClose={closeProductModal}
        product={selectedProduct}
        onAddToCart={addToCart} 
      />

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-500' : toast.type === 'info' ? 'bg-blue-500' : 'bg-gray-700'}`}
          >
            <div className="flex justify-between items-center">
              <span>{toast.message}</span>
              <Button variant="ghost" size="icon" onClick={() => removeToast(toast.id)} className="text-white hover:bg-white/20">
                <X size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
