import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react'

// Props alteradas: updateCart foi renomeado para updateQuantity, e handleCheckout foi adicionado
export function Cart({ isOpen, onClose, cart, updateQuantity, removeFromCart, handleCheckout }) {

  const getTotalPrice = () => {
    // Agora usa a quantidade diretamente do item do carrinho (prop 'cart')
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  }

  const getTotalItems = () => {
    // Agora usa a quantidade diretamente do item do carrinho (prop 'cart')
    return cart.reduce((total, item) => {
      return total + item.quantity
    }, 0)
  }

  // Não é necessário handleCheckout aqui, pois App.js passa a sua própria função.
  // Se !isOpen, retorna null (mantém o comportamento de modal)
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-card border-l border-border shadow-2xl transition-transform duration-300 transform translate-x-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="text-lg font-medium">Carrinho</h2>
              {cart.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {getTotalItems()}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 mx-auto opacity-30 mb-4" />
                <p className="text-muted-foreground">
                  O seu carrinho está vazio
                </p>
                <p className="text-sm text-muted-foreground/80 mt-2">
                  Adicione alguns produtos para começar
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <Card key={item.id} className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        {/* Simulação de Imagem/Placeholder */}
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.category}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 w-6 p-0"
                                    // Usa a prop updateQuantity
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 w-6 p-0"
                                    // Usa a prop updateQuantity
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                €{(item.price * item.quantity).toFixed(2)}
                              </p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs text-destructive hover:text-red-700 p-0 h-auto"
                                    // Usa o ID do item, conforme o App.js espera
                                onClick={() => removeFromCart(item.id)} 
                              >
                                Remover
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-border p-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>€{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Envio</span>
                  <span>Grátis</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>€{getTotalPrice().toFixed(2)}</span>
                </div>
                <Button 
                  className="w-full relative btn-eclipse" // Aplicando o btn-eclipse para consistência
                  onClick={handleCheckout} // Usa a função de checkout passada do App.js
