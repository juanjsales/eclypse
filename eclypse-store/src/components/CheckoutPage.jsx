import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LazyImage } from './LazyImage';
import { Link } from './Router';
import { ArrowLeft, CreditCard, Truck, Shield, Check, Loader2, MapPin, Phone, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function CheckoutPage({ cartItems, calculateTotal, clearCart, navigate, addToast }) {
  const { user, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const [shippingData, setShippingData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Portugal'
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const [errors, setErrors] = useState({});

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Carrinho Vazio</h1>
          <p className="text-muted-foreground mb-4">
            Não tem produtos no seu carrinho para finalizar a compra.
          </p>
          <Button onClick={() => navigate('/')}>
            Continuar a comprar
          </Button>
        </div>
      </div>
    );
  }

  const subtotal = parseFloat(calculateTotal());
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.23; // 23% IVA
  const total = subtotal + shipping + tax;

  const handleShippingInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    } else if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 3) formattedValue = formattedValue.slice(0, 3);
    }
    
    setPaymentData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateShipping = () => {
    const newErrors = {};
    
    if (!shippingData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!shippingData.email.trim()) newErrors.email = 'Email é obrigatório';
    if (!shippingData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!shippingData.address.trim()) newErrors.address = 'Morada é obrigatória';
    if (!shippingData.city.trim()) newErrors.city = 'Cidade é obrigatória';
    if (!shippingData.postalCode.trim()) newErrors.postalCode = 'Código postal é obrigatório';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    
    if (paymentMethod === 'card') {
      if (!paymentData.cardNumber.replace(/\s/g, '')) {
        newErrors.cardNumber = 'Número do cartão é obrigatório';
      } else if (paymentData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Número do cartão inválido';
      }
      
      if (!paymentData.expiryDate) {
        newErrors.expiryDate = 'Data de validade é obrigatória';
      }
      
      if (!paymentData.cvv) {
        newErrors.cvv = 'CVV é obrigatório';
      }
      
      if (!paymentData.cardName.trim()) {
        newErrors.cardName = 'Nome no cartão é obrigatório';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateShipping()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validatePayment()) {
      setCurrentStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate successful payment
    const orderId = `ORD-${Date.now()}`;
    
    // Clear cart and redirect
    if (clearCart) clearCart();
    
    setIsProcessing(false);
    addToast('Encomenda realizada com sucesso!', 'success');
    navigate(`/encomenda-confirmada/${orderId}`);
  };

  const getCardType = (number) => {
    const num = number.replace(/\s/g, '');
    if (num.startsWith('4')) return 'Visa';
    if (num.startsWith('5')) return 'Mastercard';
    if (num.startsWith('3')) return 'American Express';
    return 'Cartão';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar à loja
            </Button>
            <h1 className="text-3xl font-bold">Finalizar Compra</h1>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step ? <Check className="h-4 w-4" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Informações de Envio
                  </CardTitle>
                  <CardDescription>
                    Onde devemos enviar a sua encomenda?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={shippingData.name}
                        onChange={handleShippingInputChange}
                        placeholder="O seu nome completo"
                      />
                      {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingData.email}
                        onChange={handleShippingInputChange}
                        placeholder="o.seu.email@exemplo.com"
                      />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={shippingData.phone}
                      onChange={handleShippingInputChange}
                      placeholder="+351 123 456 789"
                    />
                    {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Morada *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingData.address}
                      onChange={handleShippingInputChange}
                      placeholder="Rua, número, andar"
                    />
                    {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingData.city}
                        onChange={handleShippingInputChange}
                        placeholder="Lisboa"
                      />
                      {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Código Postal *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={shippingData.postalCode}
                        onChange={handleShippingInputChange}
                        placeholder="1000-001"
                      />
                      {errors.postalCode && <p className="text-sm text-red-500 mt-1">{errors.postalCode}</p>}
                    </div>
                    <div>
                      <Label htmlFor="country">País</Label>
                      <Input
                        id="country"
                        name="country"
                        value={shippingData.country}
                        onChange={handleShippingInputChange}
                        disabled
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleNextStep} className="w-full">
                    Continuar para Pagamento
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Método de Pagamento
                  </CardTitle>
                  <CardDescription>
                    Como gostaria de pagar a sua encomenda?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="card">Cartão de Crédito</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão *</Label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            value={paymentData.cardNumber}
                            onChange={handlePaymentInputChange}
                            placeholder="1234 5678 9012 3456"
                            className="pr-16"
                          />
                          {paymentData.cardNumber && (
                            <Badge className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
                              {getCardType(paymentData.cardNumber)}
                            </Badge>
                          )}
                        </div>
                        {errors.cardNumber && <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Data de Validade *</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={paymentData.expiryDate}
                            onChange={handlePaymentInputChange}
                            placeholder="MM/AA"
                          />
                          {errors.expiryDate && <p className="text-sm text-red-500 mt-1">{errors.expiryDate}</p>}
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={paymentData.cvv}
                            onChange={handlePaymentInputChange}
                            placeholder="123"
                          />
                          {errors.cvv && <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="cardName">Nome no Cartão *</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={paymentData.cardName}
                          onChange={handlePaymentInputChange}
                          placeholder="Nome como aparece no cartão"
                        />
                        {errors.cardName && <p className="text-sm text-red-500 mt-1">{errors.cardName}</p>}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="paypal" className="space-y-4">
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">
                          Será redirecionado para o PayPal para completar o pagamento.
                        </p>
                        <Badge variant="secondary">Pagamento seguro com PayPal</Badge>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                      Voltar
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1">
                      Rever Encomenda
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Confirmar Encomenda
                  </CardTitle>
                  <CardDescription>
                    Reveja os detalhes antes de finalizar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Shipping Summary */}
                  <div>
                    <h3 className="font-semibold mb-2">Envio para:</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="font-medium">{shippingData.name}</p>
                      <p>{shippingData.address}</p>
                      <p>{shippingData.postalCode} {shippingData.city}</p>
                      <p>{shippingData.country}</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {shippingData.email} • {shippingData.phone}
                      </p>
                    </div>
                  </div>
                  
                  {/* Payment Summary */}
                  <div>
                    <h3 className="font-semibold mb-2">Pagamento:</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      {paymentMethod === 'card' ? (
                        <p>Cartão terminado em {paymentData.cardNumber.slice(-4)}</p>
                      ) : (
                        <p>PayPal</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                      Voltar
                    </Button>
                    <Button 
                      onClick={handlePlaceOrder} 
                      className="flex-1"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          A processar...
                        </>
                      ) : (
                        `Finalizar Encomenda (€${total.toFixed(2)})`
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumo da Encomenda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <LazyImage
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-sm">€{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envio:</span>
                    <span>{shipping === 0 ? 'Grátis' : `€${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA (23%):</span>
                    <span>€{tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>
                
                {shipping > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Adicione €{(50 - subtotal).toFixed(2)} para envio grátis!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
