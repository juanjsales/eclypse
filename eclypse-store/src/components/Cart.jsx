import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react'

export function Cart({ isOpen, onClose, cart, updateCart, removeFromCart }) {
  const [quantities, setQuantities] = useState({})

  const getQuantity = (productId) => quantities[productId] || 1

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * getQuantity(item.id))
    }, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => {
      return total + getQuantity(item.id)
    }, 0)
  }

  const handleCheckout = () => {
    alert('Funcionalidade de checkout em desenvolvimento. Obrigado pelo seu interesse!')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-black border-l border-gray-200 dark:border-gray-800 shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
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
                <p className="text-gray-500 dark:text-gray-400">
                  O seu carrinho está vazio
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Adicione alguns produtos para começar
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <Card key={`${item.id}-${index}`} className="border-gray-200 dark:border-gray-800">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                          <div className="w-8 h-8 bg-white dark:bg-black rounded-full opacity-50"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {item.category}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => updateQuantity(item.id, getQuantity(item.id) - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {getQuantity(item.id)}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => updateQuantity(item.id, getQuantity(item.id) + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                €{(item.price * getQuantity(item.id)).toFixed(2)}
                              </p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs text-red-500 hover:text-red-700 p-0 h-auto"
                                onClick={() => removeFromCart(index)}
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
            <div className="border-t border-gray-200 dark:border-gray-800 p-6">
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
                  className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                  onClick={handleCheckout}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Finalizar Compra
                </Button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  Envio grátis para encomendas acima de €50
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
