// products.js

// 1. Importe todas as imagens como módulos. O caminho é relativo a este arquivo.
import EclipseSolarImage from './eclipse-solar.png';
import LuaCrescenteImage from './lua-crescente.png';
import ViaLacteaImage from './via-lactea.png';
import BalaclavaImage from './balaclava.png'; // Exemplo para a balaclava

const products = [
  {
    id: '1',
    name: 'Eclipse Solar',
    description: 'Uma peça única inspirada na beleza e mistério do eclipse solar. Feita à mão com materiais sustentáveis.',
    price: 89.90,
    // Usando a variável importada
    image: EclipseSolarImage, 
    category: 'Coleção Eclipse'
  },
  {
    id: '2',
    name: 'Lua Crescente',
    description: 'Representa a fase de renovação e crescimento, com um design delicado e intemporal. Ideal para quem busca um toque de magia.',
    price: 75.00,
    // Usando a variável importada
    image: LuaCrescenteImage,
    category: 'Coleção Lunar'
  },
  {
    id: '3',
    name: 'Via Láctea',
    description: 'Uma homenagem à vastidão do universo, com detalhes que evocam o brilho das estrelas e a grandiosidade da nossa galáxia.',
    price: 120.00,
    // Usando a variável importada
    image: ViaLacteaImage,
    category: 'Coleção Cósmica'
  },
  {
    id: '4',
    name: 'Véu Nebuloso',
    description: 'Balaclava de algodão orgânico, representando a densidade e o mistério das nebulosas.',
    price: 45.00,
    // Usando a variável importada
    image: BalaclavaImage,
    category: 'Acessórios'
  },
];

export default products;
