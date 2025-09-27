import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { X, Heart, Share2, Star, ShoppingCart, Sun, Moon, Truck, Shield, Recycle } from 'lucide-react'

export function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('Preto')
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const sizes = ['XS', 'S', 'M', 'L', 'XL']
  const colors = ['Preto', 'Branco', 'Cinza']

  const features = [
    { icon: Truck, text: 'Envio grátis acima de €50' },
    { icon: Shield, text: 'Garantia de qualidade' },
    { icon: Recycle, text: 'Materiais sustentáveis' }
  ]

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    const productWithOptions = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    }
    onAddToCart(productWithOptions)
    onClose()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copiado para a área de transferência!')
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-black rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Product Image */}
          <div className="lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 flex items-center justify-center relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="relative">
              <Sun className="h-32 w-32 opacity-30 absolute animate-pulse" />
              <Moon className="h-32 w-32 opacity-50" />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={isFavorite ? 'text-red-500' : ''}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <h1 className="text-2xl font-light mb-2">{product.name}</h1>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(24 avaliações)</span>
                </div>
                <p className="text-3xl font-light">€{product.price.toFixed(2)}</p>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="font-medium mb-2">Descrição</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
                  Cada peça é única, criada artesanalmente seguindo os princípios do slow fashion. 
                  Utilizamos apenas materiais sustentáveis e técnicas tradicionais que respeitam 
                  o meio ambiente e valorizam o trabalho artesanal.
                </p>
              </div>

              <Separator />

              {/* Size Selection */}
              <div>
                <h3 className="font-medium mb-3">Tamanho</h3>
                <div className="flex space-x-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className="w-12 h-12"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="font-medium mb-3">Cor</h3>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                      className="px-4"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-medium mb-3">Quantidade</h3>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Features */}
              <div>
                <h3 className="font-medium mb-3">Vantagens</h3>
                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <feature.icon className="h-4 w-4 text-green-500" />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                  size="lg"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <p className="text-xs text-center text-gray-500">
                  Entrega estimada: 3-5 dias úteis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
