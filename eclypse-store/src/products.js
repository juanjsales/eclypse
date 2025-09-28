// products.js

// 1. IMPORTAR AS IMAGENS: O caminho é relativo a este arquivo products.js
import EclipseSolarImage from './eclipse-solar.png';
import LuaCrescenteImage from './lua-crescente.png';
import ViaLacteaImage from './via-lactea.png';
// Importe a balaclava também, se necessário!
// import BalaclavaImage from './balaclava.png';

const products = [
  {
    id: '1',
    name: 'Eclipse Solar',
    description: 'Uma peça única inspirada na beleza e mistério do eclipse solar. Feita à mão com materiais sustentáveis.',
    price: 89.90,
    // 2. USAR A VARIÁVEL IMPORTADA (NÃO A STRING!)
    image: EclipseSolarImage, 
    category: 'Coleção Eclipse'
  },
  {
    id: '2',
    name: 'Lua Crescente',
    description: 'Representa a fase de renovação e crescimento, com um design delicado e intemporal. Ideal para quem busca um toque de magia.',
    price: 75.00,
    // 2. USAR A VARIÁVEL IMPORTADA
    image: LuaCrescenteImage,
    category: 'Coleção Lunar'
  },
  {
    id: '3',
    name: 'Via Láctea',
    description: 'Uma homenagem à vastidão do universo, com detalhes que evocam o brilho das estrelas e a grandiosidade da nossa galáxia.',
    price: 120.00,
    // 2. USAR A VARIÁVEL IMPORTADA
    image: ViaLacteaImage,
    category: 'Coleção Cósmica'
  },
  // ...
];

export default products;



