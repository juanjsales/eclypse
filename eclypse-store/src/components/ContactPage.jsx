import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, Clock, Send, Instagram } from 'lucide-react';

export function ContactPage({ addToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário
    setTimeout(() => {
      addToast('Mensagem enviada com sucesso! Responderemos em breve.', 'success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">Contacte-nos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tem alguma questão sobre os nossos produtos ou filosofia? Adoraríamos ouvir de si. 
            Entre em contacto connosco através do formulário abaixo ou utilize as nossas informações de contacto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário de Contacto */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Envie-nos uma Mensagem</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo e responderemos o mais breve possível.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nome *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="O seu nome"
                      aria-describedby="name-help"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="o.seu.email@exemplo.com"
                      aria-describedby="email-help"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Assunto *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Assunto da sua mensagem"
                    aria-describedby="subject-help"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensagem *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Escreva a sua mensagem aqui..."
                    rows={6}
                    aria-describedby="message-help"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                  aria-label="Enviar mensagem de contacto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      A enviar...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informações de Contacto */}
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Informações de Contacto</CardTitle>
                <CardDescription>
                  Outras formas de entrar em contacto connosco.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">contato@eclypse.hip</p>
                    <p className="text-sm text-muted-foreground">
                      Responderemos em 24-48 horas
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Telefone</h3>
                    <p className="text-muted-foreground">+351 123 456 789</p>
                    <p className="text-sm text-muted-foreground">
                      Segunda a Sexta, 9h-18h
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Instagram className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Instagram</h3>
                    <p className="text-muted-foreground">@eclypse.hip</p>
                    <p className="text-sm text-muted-foreground">
                      Siga-nos para novidades e inspirações
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Localização</h3>
                    <p className="text-muted-foreground">
                      Atelier Eclypse<br />
                      Rua da Arte, 123<br />
                      1200-001 Lisboa, Portugal
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Horário de Atendimento</h3>
                    <div className="text-muted-foreground text-sm">
                      <p>Segunda a Sexta: 9h00 - 18h00</p>
                      <p>Sábado: 10h00 - 16h00</p>
                      <p>Domingo: Fechado</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filosofia da Marca */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">A Nossa Filosofia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Na Eclypse, cada contacto é uma oportunidade de partilhar a nossa paixão pelo slow fashion 
                  e pela arte com as mãos. Valorizamos cada mensagem e procuramos sempre responder de forma 
                  personalizada e atenciosa, refletindo os valores de sustentabilidade e cuidado que guiam 
                  a nossa marca.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
