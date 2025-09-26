import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Link } from './Router';
import { CheckCircle, Package, Truck, Mail, Download, ArrowRight } from 'lucide-react';

export function OrderConfirmationPage({ orderId, navigate }) {
  // Mock order data - in a real app, this would come from an API
  const orderData = {
    id: orderId || 'ORD-123456',
    date: new Date().toLocaleDateString('pt-PT'),
    status: 'Confirmada',
    estimatedDelivery: '3-5 dias úteis',
    total: 164.90,
    items: [
      { id: 1, name: 'Eclipse Solar', price: 89.90, quantity: 1 },
      { id: 2, name: 'Lua Crescente', price: 75.00, quantity: 1 }
    ],
    shipping: {
      name: 'Maria Silva',
      address: 'Rua da Arte, 123',
      city: 'Lisboa',
      postalCode: '1200-001',
      country: 'Portugal'
    },
    payment: {
      method: 'Cartão de Crédito',
      last4: '1234'
    }
  };

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert('Funcionalidade de download do recibo será implementada em breve!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Encomenda Confirmada!</h1>
          <p className="text-lg text-muted-foreground">
            Obrigado pela sua compra. A sua encomenda foi recebida e está a ser processada.
          </p>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Detalhes da Encomenda
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Número da Encomenda:</span>
                <Badge variant="secondary">{orderData.id}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Data:</span>
                <span>{orderData.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Estado:</span>
                <Badge className="bg-green-500 text-white">{orderData.status}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Entrega Estimada:</span>
                <span>{orderData.estimatedDelivery}</span>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-semibold">Produtos Encomendados:</h4>
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                    </div>
                    <p className="font-medium">€{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>€{orderData.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping & Payment */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Morada de Envio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">{orderData.shipping.name}</p>
                  <p>{orderData.shipping.address}</p>
                  <p>{orderData.shipping.postalCode} {orderData.shipping.city}</p>
                  <p>{orderData.shipping.country}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Método de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{orderData.payment.method}</p>
                <p className="text-sm text-muted-foreground">
                  Cartão terminado em {orderData.payment.last4}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Próximos Passos</CardTitle>
            <CardDescription>
              O que acontece a seguir com a sua encomenda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <p className="font-medium">Confirmação por Email</p>
                  <p className="text-sm text-muted-foreground">
                    Receberá um email de confirmação com todos os detalhes da sua encomenda.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <p className="font-medium">Preparação da Encomenda</p>
                  <p className="text-sm text-muted-foreground">
                    A nossa equipa irá preparar cuidadosamente os seus produtos artesanais.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <p className="font-medium">Envio</p>
                  <p className="text-sm text-muted-foreground">
                    Receberá um código de rastreamento quando a encomenda for enviada.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  4
                </div>
                <div>
                  <p className="font-medium">Entrega</p>
                  <p className="text-sm text-muted-foreground">
                    A sua encomenda será entregue na morada indicada em {orderData.estimatedDelivery}.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleDownloadReceipt} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Descarregar Recibo
          </Button>
          
          <Button onClick={() => navigate('/')}>
            Continuar a Comprar
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Support */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Precisa de Ajuda?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Se tiver alguma questão sobre a sua encomenda, não hesite em contactar-nos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={() => navigate('/contacto')}>
                <Mail className="h-4 w-4 mr-2" />
                Contactar Suporte
              </Button>
              
              <Link to="/perfil" className="inline-flex">
                <Button variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  Ver Encomendas
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
