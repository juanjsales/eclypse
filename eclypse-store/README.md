# Eclypse Store - Plataforma de E-commerce Completa

Uma plataforma de e-commerce moderna e completa para a marca Eclypse, especializada em slow fashion e produtos artesanais. Desenvolvida com React, oferece uma experiência de compra elegante e funcional.

## 🌟 Características Principais

### 🛍️ E-commerce Completo
- **Catálogo de Produtos**: Visualização em grid/lista com filtros avançados
- **Carrinho de Compras**: Gestão completa de itens com quantidades
- **Checkout Seguro**: Processo de compra em 3 etapas com validação
- **Gestão de Stock**: Controlo de disponibilidade em tempo real
- **Páginas de Produto**: Detalhes completos com galeria de imagens

### 👤 Sistema de Utilizadores
- **Autenticação**: Login/registo com validação
- **Perfil de Utilizador**: Gestão de conta e preferências
- **Favoritos**: Lista de produtos favoritos
- **Histórico de Encomendas**: Acompanhamento de compras anteriores

### 📝 Blog Integrado
- **Artigos sobre Slow Fashion**: Conteúdo educativo e inspiracional
- **Sistema de Categorias**: Organização por temas
- **Pesquisa e Filtros**: Encontrar conteúdo facilmente
- **Páginas de Artigo**: Layout otimizado para leitura

### 🌍 Internacionalização
- **Múltiplos Idiomas**: Português, Inglês e Espanhol
- **Seletor de Idioma**: Mudança fácil entre idiomas
- **Formatação Regional**: Datas e moedas localizadas

### 🎨 Design e UX
- **Tema Claro/Escuro**: Alternância entre modos
- **Design Responsivo**: Funciona em todos os dispositivos
- **Animações Suaves**: Transições elegantes
- **Acessibilidade**: Compatível com leitores de ecrã

### ⚡ Performance
- **Carregamento Lazy**: Imagens carregadas sob demanda
- **Otimização SEO**: Metadados e estrutura semântica
- **Notificações Toast**: Feedback visual não intrusivo

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou pnpm

### Passos de Instalação

1. **Descompactar o projeto**
   ```bash
   unzip eclypse-store-final.zip
   cd eclypse-store
   ```

2. **Instalar dependências**
   ```bash
   npm install
   # ou se tiver problemas com dependências:
   npm install --force
   # ou
   npm install --legacy-peer-deps
   ```

3. **Iniciar o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Aceder ao site**
   - Abrir o navegador em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
eclypse-store/
├── src/
│   ├── components/          # Componentes React
│   │   ├── ui/             # Componentes de interface base
│   │   ├── AuthModal.jsx   # Modal de autenticação
│   │   ├── BlogPage.jsx    # Página principal do blog
│   │   ├── Cart.jsx        # Componente do carrinho
│   │   ├── CheckoutPage.jsx # Página de checkout
│   │   └── ...
│   ├── contexts/           # Contextos React
│   │   ├── AuthContext.jsx # Gestão de autenticação
│   │   ├── I18nContext.jsx # Internacionalização
│   │   └── StockContext.jsx # Gestão de stock
│   ├── assets/             # Imagens e recursos
│   ├── blog-data.js        # Dados dos artigos do blog
│   ├── products.js         # Dados dos produtos
│   └── App.jsx             # Componente principal
├── public/                 # Ficheiros públicos
├── package.json           # Dependências do projeto
└── README.md              # Este ficheiro
```

## 🔧 Funcionalidades Detalhadas

### Sistema de Autenticação
- **Contas de demonstração disponíveis:**
  - Email: `maria@exemplo.com` | Palavra-passe: `123456`
  - Email: `joao@exemplo.com` | Palavra-passe: `123456`

### Gestão de Produtos
- 6 produtos de demonstração com imagens geradas por IA
- Categorias: Eclipse, Celestial, Artesanal
- Preços entre €45-€120
- Sistema de avaliações e comentários

### Blog
- 4 artigos sobre slow fashion e sustentabilidade
- Categorias: Sustentabilidade, Artesanato, Design
- Sistema de tags para organização
- Newsletter integrada

### Checkout
- Simulação completa de processo de compra
- Validação de formulários
- Múltiplos métodos de pagamento
- Cálculo automático de envio e impostos

## 🎨 Personalização

### Temas
O site suporta temas claro e escuro. A preferência é guardada localmente.

### Idiomas
Para adicionar novos idiomas, editar o ficheiro `src/contexts/I18nContext.jsx`:
1. Adicionar traduções ao objeto `translations`
2. Adicionar o idioma ao array `supportedLanguages`

### Produtos
Para modificar produtos, editar o ficheiro `src/products.js`.

### Artigos do Blog
Para adicionar/modificar artigos, editar o ficheiro `src/blog-data.js`.

## 🛠️ Scripts Disponíveis

- `npm run dev` - Iniciar servidor de desenvolvimento
- `npm run build` - Construir para produção
- `npm run preview` - Pré-visualizar build de produção
- `npm run lint` - Verificar código com ESLint

## 📱 Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos**: Desktop, tablet, mobile
- **Resolução**: Responsivo a partir de 320px

## 🔒 Segurança

- Validação de formulários no frontend
- Sanitização de inputs
- Headers de segurança configurados
- Dados sensíveis não expostos

## 🚀 Deploy

Para fazer deploy em produção:

1. **Build do projeto**
   ```bash
   npm run build
   ```

2. **Deploy da pasta `dist/`**
   - Pode ser feito em qualquer servidor web estático
   - Netlify, Vercel, GitHub Pages, etc.

## 📞 Suporte

Para questões técnicas ou sugestões:
- Contacto através da página de contacto do site
- Formulário de contacto integrado com validação

## 📄 Licença

Este projeto foi desenvolvido como demonstração de uma plataforma de e-commerce completa para a marca Eclypse.

---

**Desenvolvido com ❤️ para a Eclypse - "Entre o clarão e a sombra, o invisível molda o visível"**
