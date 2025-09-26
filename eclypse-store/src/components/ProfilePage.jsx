import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { LazyImage } from './LazyImage';
import { Link } from './Router';
import { User, Heart, Package, Settings, Edit, Save, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import productsData from '../products';

export function ProfilePage({ navigate, addToast, addToCart }) {
  const { user, logout, updateProfile, addToFavorites, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
          <p className="text-muted-foreground mb-4">
            Precisa de fazer login para aceder ao seu perfil.
          </p>
          <Button onClick={() => navigate('/')}>
            Voltar à página inicial
          </Button>
        </div>
      </div>
    );
  }

  const favoriteProducts = productsData.filter(product => 
    user.favorites?.includes(product.id)
  );

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const result = await updateProfile(profileData);
    if (result.success) {
      setIsEditing(false);
      addToast('Perfil atualizado com sucesso!', 'success');
    }
  };

  const handleLogout = () => {
    logout();
    addToast('Sessão terminada com sucesso!', 'info');
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Entregue':
        return 'bg-green-500';
      case 'Em trânsito':
        return 'bg-blue-500';
      case 'Processando':
        return 'bg-yellow-500';
      case 'Cancelado':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Minha Conta</h1>
            <p className="text-muted-foreground">Gerir o seu perfil e preferências</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Favoritos</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Encomendas</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Definições</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Informações do Perfil</CardTitle>
                    <CardDescription>
                      Gerir as suas informações pessoais
                    </CardDescription>
                  </div>
                  {!isEditing && (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button type="submit" disabled={isLoading}>
                        <Save className="h-4 w-4 mr-2" />
                        Guardar
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setIsEditing(false);
                          setProfileData({ name: user.name, email: user.email });
                        }}
                        disabled={isLoading}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Nome</Label>
                      <p className="text-lg">{user.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                      <p className="text-lg">{user.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Membro desde</Label>
                      <p className="text-lg">Janeiro 2024</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Produtos Favoritos</CardTitle>
                <CardDescription>
                  Os seus produtos favoritos ({favoriteProducts.length})
                </CardDescription>
              </CardHeader>
              <CardContent>
                {favoriteProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Ainda não tem produtos favoritos.</p>
                    <Button className="mt-4" onClick={() => navigate('/')}>
                      Explorar produtos
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => navigate(`/produto/${product.id}`)}
                      >
                        <CardHeader className="p-0">
                          <LazyImage
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                          />
                        </CardHeader>
                        <CardContent className="p-4">
                          <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                          <CardDescription className="text-sm line-clamp-2 mb-3">
                            {product.description}
                          </CardDescription>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold">€{product.price.toFixed(2)}</span>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToFavorites(product.id);
                                  addToast('Removido dos favoritos', 'info');
                                }}
                              >
                                <Heart className="h-4 w-4 fill-current text-red-500" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(product);
                                  addToast(`${product.name} adicionado ao carrinho!`, 'success');
                                }}
                              >
                                Adicionar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Encomendas</CardTitle>
                <CardDescription>
                  As suas encomendas anteriores ({user.orders?.length || 0})
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!user.orders || user.orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Ainda não fez nenhuma encomenda.</p>
                    <Button className="mt-4" onClick={() => navigate('/')}>
                      Começar a comprar
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {user.orders.map((order) => (
                      <Card key={order.id} className="border">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">Encomenda #{order.id}</CardTitle>
                              <CardDescription>
                                {new Date(order.date).toLocaleDateString('pt-PT')}
                              </CardDescription>
                            </div>
                            <Badge className={`${getStatusColor(order.status)} text-white`}>
                              {order.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Quantidade: {item.quantity}
                                  </p>
                                </div>
                                <p className="font-medium">€{(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                          <Separator className="my-4" />
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">Total:</span>
                            <span className="text-xl font-bold">€{order.total.toFixed(2)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Definições da Conta</CardTitle>
                <CardDescription>
                  Gerir as suas preferências e definições
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Notificações</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Novos produtos</p>
                        <p className="text-sm text-muted-foreground">
                          Receber notificações sobre novos produtos
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Ativar</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promoções</p>
                        <p className="text-sm text-muted-foreground">
                          Receber ofertas especiais e descontos
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Ativar</Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Privacidade</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Descarregar dados pessoais
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      Eliminar conta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
