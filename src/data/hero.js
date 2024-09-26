import FondoHero1 from '../assets/FondoHero/FondoHero.png';
import FondoHero2 from '../assets/FondoHero/FondoHero2.png';
import FondoHero3 from '../assets/FondoHero/FondoHero3.png';

const heroData = [
  {
    id: 1,
    title: 'Promociones que te esperan',
    description: 'Productos seleccionados con 33% de descuento',
    buttonText: 'Ver Ofertas',
    buttonLink: '/promotions',
    backgroundImage: FondoHero1,
  },
  {
    id: 2,
    title: 'Mira nuestros nuevos productos',
    description: 'Lo nuevo ha llegado',
    buttonText: 'Ver Productos',
    buttonLink: '/products',
    backgroundImage: FondoHero2,
  },
  {
    id: 3,
    title: 'Mira los testimonios',
    description: 'Varios ya compraron',
    buttonText: 'Ver Testimonios',
    buttonLink: '/TestimoniosPage',
    backgroundImage: FondoHero3,
  },
];

export default heroData;
