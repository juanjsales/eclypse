import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { LazyImage } from './LazyImage';
import { Link } from './Router';
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, Truck, Shield, Recycle, ChevronLeft, ChevronRight } from 'lucide-react';
import productsData from '../products';

export function ProductPage({ productId, navigate, addToCart, addToast }) {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Preto');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['Preto', 'Branco', 'Cinza'];

  const features = [
    { icon: Truck, text: 'Envio grátis acima de €50' },
    { icon: Shield, text: 'Garantia de qualidade' },
    { icon: Recycle, text: 'Materiais sustentáveis' }
  ];

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      name: 'Maria Silva',
      rating: 5,
      date: '2024-01-15',
      comment: 'Produto incrível! A qualidade é excepcional e o design é único. Recomendo vivamente.',
      verified: true
    },
    {
      id: 2,
      name: 'João Santos',
      rating: 4,
      date: '2024-01-10',
      comment: 'Muito satisfeito com a compra. O material é de alta qualidade e o acabamento é perfeito.',
      verified: true
    },
    {
      id: 3,
      name: 'Ana Costa',
      rating: 5,
      date: '2024-01-05',
      comment: 'Adorei! É exatamente como esperava. A filosofia slow fashion da marca é inspiradora.',
      verified: false
    }
  ];

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setReviews(mockReviews);
      
      // Get related products from the same category
      const related = productsData
        .filter(p => p.id !== productId && p.category === foundProduct.category)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Link to="/" className="text-primary hover:underline">Voltar à página inicial</Link>
        </div>
      </div>
    );
  }

  // Mock gallery images (in a real scenario, these would come from the product data)
  const galleryImages = [
    product.image,
    product.image, // Placeholder for additional images
    product.image,
  ];

  const handleAddToCart = () => {
    const productWithOptions = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    };
    addToCart(productWithOptions);
    addToast(`${product.name} adicionado ao carrinho!`, 'success');
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
      addToast('Link copiado para a área de transferência!', 'info');
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground">Início</Link></li>
          <li>/</li>
          <li><span className="text-foreground">{product.name}</span></li>
        </ol>
      </nav>

      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')} 
        className="mb-6"
        aria-label="Voltar à página inicial"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <LazyImage
              src={galleryImages[currentImageIndex]}
              alt={`${product.name} - Imagem ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {galleryImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                  onClick={prevImage}
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                  onClick={nextImage}
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          
          {/* Thumbnail Gallery */}
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
                  aria-label={`Ver imagem ${index + 1}`}
                >
                  <LazyImage
                    src={img}
                    alt={`${product.name} - Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
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
                  aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleShare} aria-label="Partilhar produto">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(averageRating) ? 'fill-current text-yellow-400' : 'text-muted-foreground'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} ({reviews.length} avaliações)
              </span>
            </div>
            <p className="text-4xl font-bold">€{product.price.toFixed(2)}</p>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Descrição</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
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
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSize(size)}
                  className="w-12 h-12"
                  aria-pressed={selectedSize === size}
                  aria-label={`Selecionar tamanho ${size}`}
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
                  variant={selectedColor === color ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedColor(color)}
                  className="px-4"
                  aria-pressed={selectedColor === color}
                  aria-label={`Selecionar cor ${color}`}
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
                aria-label="Diminuir quantidade"
              >
                -
              </Button>
              <span className="w-12 text-center" aria-live="polite">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Aumentar quantidade"
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
          <div className="space-y-3">
            <Button
              onClick={handleAddToCart}
              className="w-full"
              size="lg"
              aria-label="Adicionar produto ao carrinho"
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

      {/* Reviews Section */}
      <section className="mt-16" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="text-2xl font-bold mb-8">Avaliações dos Clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm">{review.name}</CardTitle>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < review.rating ? 'fill-current text-yellow-400' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  {review.verified && (
                    <Badge variant="secondary" className="text-xs">Verificado</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(review.date).toLocaleDateString('pt-PT')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16" aria-labelledby="related-products-heading">
          <h2 id="related-products-heading" className="text-2xl font-bold mb-8">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/produto/${relatedProduct.id}`)}
                role="article"
                aria-label={`Produto relacionado: ${relatedProduct.name}`}
              >
                <CardHeader className="p-0">
                  <LazyImage
                    src={relatedProduct.image}
                    alt={`Imagem do produto ${relatedProduct.name}`}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg font-semibold mb-2">{relatedProduct.name}</CardTitle>
                  <CardDescription className="text-muted-foreground text-sm line-clamp-2">
                    {relatedProduct.description}
                  </CardDescription>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold">€{relatedProduct.price.toFixed(2)}</span>
                    <Button 
                      size="sm" 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        addToCart(relatedProduct); 
                        addToast(`${relatedProduct.name} adicionado ao carrinho!`, 'success');
                      }}
                      aria-label={`Adicionar ${relatedProduct.name} ao carrinho`}
                    >
                      Adicionar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
