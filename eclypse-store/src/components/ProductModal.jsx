import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Heart, Share2, Star, ShoppingCart, Truck, Shield, Recycle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Preto');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [mainImage, setMainImage] = useState(product?.image);

  // Reset state when a new product is opened or modal is closed
  useEffect(() => {
    if (product && isOpen) {
      setMainImage(product.image);
      setSelectedSize('M');
      setSelectedColor('Preto');
      setQuantity(1);
      setIsFavorite(false);
    }
  }, [product, isOpen]);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['Preto', 'Branco', 'Cinza'];
  const galleryImages = [
    product?.image,
    // ADICIONAR LÓGICA PARA VARIAÇÕES FUTURAS AQUI
  ].filter(Boolean); // Remove entradas nulas/vazias

  const features = [
    { icon: Truck, text: 'Envio grátis acima de €50' },
    { icon: Shield, text: 'Garantia de qualidade' },
    { icon: Recycle, text: 'Materiais sustentáveis' }
  ];

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    const productWithOptions = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    };
    onAddToCart(productWithOptions);
    onClose();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };
    
  // Estilo condicional para o btn-eclipse nos seletores
  const getButtonClass = (isActive) => 
    isActive 
      ? "relative btn-eclipse" 
      : "bg-background text-foreground hover:bg-muted/50";


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[825px] p-0">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground">
          <X size={24} />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Image and Gallery */}
          <div className="p-4 bg-card-foreground/5 rounded-l-lg flex flex-col justify-between">
            <img src={mainImage} alt={product.name} className="w-full h-auto max-h-[400px] object-contain rounded-lg shadow-lg mb-4" />
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {galleryImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} - view ${index + 1}`}
                    className={`w-full h-20 object-cover rounded-md cursor-pointer border-2 transition-colors duration-200 ${mainImage === img ? 'border-primary shadow-md' : 'border-border/50'}`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={isFavorite ? 'text-red-500 hover:bg-red-500/10' : ''}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <DialogTitle className="text-3xl font-bold mb-2">{product.name}</DialogTitle>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {/* Placeholder Rating */}
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-500/80" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(24 avaliações)</span>
                </div>
                <p className="text-4xl font-bold">€{product.price.toFixed(2)}</p>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Descrição</h3>
                <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </DialogDescription>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                  Cada peça é única, criada artesanalmente seguindo os princípios do slow fashion.
                  Utilizamos apenas materiais sustentáveis e técnicas tradicionais que respeitam
                  o meio ambiente e valorizam o trabalho artesanal.
                </p>
              </div>

              <Separator />

              {/* Size Selection */}
              <div>
                <h3 className="font-semibold mb-3">Tamanho</h3>
                <div className="flex space-x-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      // Aplica o btn-eclipse quando ativo
                      className={`w-12 h-12 ${getButtonClass(selectedSize === size)}`}
                      onClick={() => setSelectedSize(size)}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="font-semibold mb-3">Cor</h3>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <Button
                      key={color}
                      // Aplica o btn-eclipse quando ativo
                      className={`px-4 ${getButtonClass(selectedColor === color)}`}
                      onClick={() => setSelectedColor(color)}
                      variant={selectedColor === color ? "default" : "outline"}
                      size="sm"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-semibold mb-3">Quantidade</h3>
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
                <h3 className="font-semibold mb-3">Vantagens</h3>
                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <feature.icon className="h-4 w-4 text-primary" />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-3 mt-6">
                <Button
                  onClick={handleAddToCart}
                  // APLICAÇÃO DO ESTILO BTN-ECLIPSE
                  className="w-full relative btn-eclipse bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Entrega estimada: 3-5 dias úteis
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
