import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { ShoppingCart, Sun, Moon, Star, Heart, Instagram, Mail, Phone, Search, Filter, Grid, List } from 'lucide-react'
import { Cart } from './components/Cart.jsx'
import { ProductModal } from './components/ProductModal.jsx'
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  const [darkMode, setDarkMode] = useState(true)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [viewMode, setViewMode] = useState('grid')
  const [favorites, setFavorites] = useState([])

  const products = [
    {
      id: 1,
      name: "Eclipse Solar",
      description: "Peça artesanal inspirada no eclipse solar. Feita à mão com materiais sustentáveis.",
      price: 89.90,
      image: "/api/placeholder/300/300",
      category: "Arte Têxtil",
      inStock: true,
      rating: 4.8,
      reviews: 24
    },
    {
      id: 2,
      name: "Lua Crescente",
      description: "Design minimalista que captura a essência da lua crescente. Slow fashion autêntica.",
      price: 75.50,
      image: "/api/placeholder/300/300",
      category: "Acessórios",
      inStock: true,
      rating: 4.9,
      reviews: 18
    },
    {
      id: 3,
      name: "Constelação",
      description: "Padrão único inspirado nas constelações. Arte com as mãos, peça exclusiva.",
      price: 120.00,
      image: "/api/placeholder/300/300",
      category: "Vestuário",
      inStock: false,
      rating: 5.0,
      reviews: 12
    },
    {
      id: 4,
      name: "Sombra e Luz",
      description: "Entre o clarão e a sombra. Peça que representa a dualidade da existência.",
      price: 95.00,
      image: "/api/placeholder/300/300",
      category: "Arte Têxtil",
      inStock: true,
      rating: 4.7,
      reviews: 31
    },
    {
      id: 5,
      name: "Solstício",
      description: "Inspirada nos solstícios, esta peça celebra os ciclos naturais da vida.",
      price: 110.00,
      image: "/api/placeholder/300/300",
      category: "Vestuário",
      inStock: true,
      rating: 4.8,
      reviews: 15
    },
    {
      id: 6,
      name: "Penumbra",
      description: "Jogo de sombras e texturas que evoca a penumbra de um eclipse.",
      price: 65.00,
      image: "/api/placeholder/300/300",
      category: "Acessórios",
      inStock: true,
      rating: 4.6,
      reviews: 22
    }
  ]

  const categories = ['Todos', 'Arte Têxtil', 'Acessórios', 'Vestuário']

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (product) => {
    setCart([...cart, product])
    // Show success message
    const message = document.createElement('div')
    message.textContent = 'Produto adicionado ao carrinho!'
    message.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50'
    document.body.appendChild(message)
    setTimeout(() => document.body.removeChild(message), 3000)
  }

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index)
    setCart(newCart)
  }

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const openProductModal = (product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const getTotalItems = () => {
    return cart.length
  }

  // Auto-save cart to localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('eclypse-cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('eclypse-cart', JSON.stringify(cart))
  }, [cart])

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark bg-black text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <header className="border-b border-gray-800 dark:border-gray-200 sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Sun className="h-8 w-8 absolute animate-spin-slow" />
                <Moon className="h-8 w-8 opacity-70" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Eclypse</h1>
                <p className="text-sm opacity-70">slow fashion</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="p-2"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Carrinho
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-light mb-6 leading-tight animate-fade-in-up">
              Entre o clarão e a sombra
            </h2>
            <p className="text-xl opacity-80 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              O invisível molda o visível
            </p>
            <p className="text-lg opacity-60 mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              Arte com as mãos. Cada peça é única, criada com amor e dedicação, 
              seguindo os princípios do slow fashion para um mundo mais sustentável.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm opacity-50 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <span className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                27/09/2025
              </span>
              <span>Por @hip0litto</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 border-t border-gray-800 dark:border-gray-200">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
                <Input
                  placeholder="Pesquisar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 opacity-50" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-white dark:bg-black">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-light text-center mb-12">
            Coleção ({filteredProducts.length} produtos)
          </h3>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Nenhum produto encontrado para "{searchTerm}"
              </p>
            </div>
          ) : (
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}>
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className={`group hover:shadow-2xl transition-all duration-300 border-gray-800 dark:border-gray-200 bg-transparent card-eclipse cursor-pointer ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}
                  onClick={() => openProductModal(product)}
                >
                  <CardHeader className={`p-0 ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                    <div className={`bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 ${
                      viewMode === 'list' ? 'h-full' : 'aspect-square'
                    } rounded-t-lg ${viewMode === 'list' ? 'rounded-l-lg rounded-tr-none' : ''} flex items-center justify-center relative overflow-hidden`}>
                      <div className="relative">
                        <Sun className="h-16 w-16 opacity-30 absolute animate-pulse" />
                        <Moon className="h-16 w-16 opacity-50" />
                      </div>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="secondary">Esgotado</Badge>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(product.id)
                        }}
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? 'fill-current text-red-500' : ''}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-current text-yellow-400" />
                        <span className="text-xs">{product.rating}</span>
                        <span className="text-xs opacity-50">({product.reviews})</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                    <CardDescription className="text-sm opacity-70 mb-4">
                      {product.description}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-light">
                        €{product.price.toFixed(2)}
                      </div>
                      {product.inStock && (
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart(product)
                          }}
                          size="sm"
                          className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors btn-eclipse"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Adicionar
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4 border-t border-gray-800 dark:border-gray-200">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-8">Nossa Filosofia</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <Sun className="h-12 w-12 mx-auto opacity-70 animate-eclipse" />
                <h4 className="text-xl font-light">Slow Fashion</h4>
                <p className="text-sm opacity-60">
                  Produção consciente e sustentável, respeitando o tempo natural de criação.
                </p>
              </div>
              <div className="space-y-4">
                <Star className="h-12 w-12 mx-auto opacity-70" />
                <h4 className="text-xl font-light">Arte com as Mãos</h4>
                <p className="text-sm opacity-60">
                  Cada peça é única, criada artesanalmente com técnicas tradicionais.
                </p>
              </div>
              <div className="space-y-4">
                <Moon className="h-12 w-12 mx-auto opacity-70" />
                <h4 className="text-xl font-light">Sustentabilidade</h4>
                <p className="text-sm opacity-60">
                  Materiais eco-friendly e processos que respeitam o meio ambiente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 border-t border-gray-800 dark:border-gray-200">
        <div className="container mx-auto text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-light mb-4">Fique por dentro</h3>
            <p className="text-sm opacity-60 mb-6">
              Receba novidades sobre nossas coleções e o universo do slow fashion.
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Seu email"
                className="flex-1"
              />
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                Subscrever
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 dark:border-gray-200 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Sun className="h-6 w-6" />
                <span className="text-xl font-light">Eclypse</span>
              </div>
              <p className="text-sm opacity-60 mb-4 max-w-md">
                Entre o clarão e a sombra, criamos arte que transcende o tempo. 
                Cada peça conta uma história única, moldada pelas mãos e pelo coração.
              </p>
              <div className="flex space-x-4">
                <Instagram className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                <Mail className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                <Phone className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-4">Produtos</h5>
              <ul className="space-y-2 text-sm opacity-60">
                <li className="hover:opacity-100 cursor-pointer transition-opacity">Arte Têxtil</li>
                <li className="hover:opacity-100 cursor-pointer transition-opacity">Acessórios</li>
                <li className="hover:opacity-100 cursor-pointer transition-opacity">Vestuário</li>
                <li className="hover:opacity-100 cursor-pointer transition-opacity">Peças Exclusivas</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Informações</h5>
              <ul className="space-y-2 text-sm opacity-60">
                <li className="hover:opacity-100 cursor-pointer transition-opacity">Sobre Nós</li>
                <li className="hover:opacity-100 cursor-pointer transition-opacity">Sustentabilidade</li>
                <li className="hover:opacity-100 cursor-pointer transition-opacity">Envios</li>
                <li className="hover:opacity-100 cursor-pointer transition-opacity">Contacto</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-200 mt-8 pt-8 text-center">
            <p className="text-sm opacity-50">
              © 2025 Eclypse. O invisível molda o visível.
            </p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateCart={setCart}
        removeFromCart={removeFromCart}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={addToCart}
      />
    </div>
  )
}

export default App
