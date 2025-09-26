import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { LazyImage } from './LazyImage';
import { Link } from './Router';
import { Search, Calendar, Clock, User, ArrowRight, Filter } from 'lucide-react';
import { blogPosts, categories, tags } from '../blog-data';

export function BlogPage({ navigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedTag, setSelectedTag] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  const featuredPost = blogPosts[0]; // First post as featured
  const recentPosts = blogPosts.slice(1, 4); // Next 3 posts

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-PT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">Blog Eclypse</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra o mundo do slow fashion, sustentabilidade e arte artesanal. 
            Partilhamos conhecimento, inspiração e a filosofia por trás de cada criação.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Card 
            className="mb-12 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => navigate(`/blog/${featuredPost.slug}`)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <LazyImage
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  Em Destaque
                </Badge>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-3">
                  {featuredPost.category}
                </Badge>
                <CardTitle className="text-2xl mb-3 hover:text-primary transition-colors">
                  {featuredPost.title}
                </CardTitle>
                <CardDescription className="text-base mb-4 line-clamp-3">
                  {featuredPost.excerpt}
                </CardDescription>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-4">{featuredPost.author}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-4">{formatDate(featuredPost.publishedAt)}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{featuredPost.readTime}</span>
                </div>
                <Button variant="outline" className="w-fit">
                  Ler Artigo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Pesquisar artigos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedTag ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTag('')}
            >
              Todas as tags
            </Button>
            {tags.slice(0, 8).map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                #{tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredPosts.length === 1 
              ? '1 artigo encontrado' 
              : `${filteredPosts.length} artigos encontrados`
            }
          </p>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <CardHeader className="p-0">
                  <div className="relative h-48">
                    <LazyImage
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      variant="secondary" 
                      className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm"
                    >
                      {post.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-3 hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="mb-4 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum artigo encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou termos de pesquisa.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todos');
                setSelectedTag('');
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}

        {/* Newsletter Signup */}
        <Card className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Mantenha-se Atualizado</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscreva a nossa newsletter para receber os últimos artigos sobre slow fashion, 
              sustentabilidade e as novidades da Eclypse diretamente no seu email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="O seu email" 
                className="flex-1"
              />
              <Button>Subscrever</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Respeitamos a sua privacidade. Pode cancelar a subscrição a qualquer momento.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
