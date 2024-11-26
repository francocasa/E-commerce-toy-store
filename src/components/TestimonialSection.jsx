import { useRef } from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialSection = () => {
  const scrollRef = useRef(null); // Referencia al contenedor

  // Datos estáticos de testimonios
  const testimonials = [
    {
      id: 'test1',
      author: 'Miguel Pariona',
      image: '/Perfil/photo_1.png',
      text: 'Me gustó mucho el carrito.',
    },
    {
      id: 'test2',
      author: 'Juan Pérez',
      image: '/Perfil/photo_2.png',
      text: 'Me gustó el tractor.',
    },
    {
      id: 'test3',
      author: 'Ana Gómez',
      image: '/Perfil/photo_3.png',
      text: 'Excelente calidad en los juguetes.',
    },
    {
      id: 'test4',
      author: 'Luis Fernández',
      image: '/Perfil/photo_4.png',
      text: 'Los precios son muy accesibles.',
    },
    {
      id: 'test5',
      author: 'Sofía López',
      image: '/Perfil/photo_5.png',
      text: 'Gran variedad de productos.',
    },
    {
      id: 'test6',
      author: 'Carlos Rodríguez',
      image: '/Perfil/photo_6.png',
      text: 'Me encantó la atención al cliente.',
    },
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">Testimonios</h2>
        <a href="/testimonios" className="text-blue-600 hover:underline">
          Ver todo &rarr;
        </a>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-scroll no-scrollbar p-2"
        >
          {/* Mapear los testimonios desde el arreglo estático */}
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-fit">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white font-bold border shadow-md text-blue-500 h-8 aspect-square flex justify-center items-center rounded-full "
        >
          {'<'}
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white font-bold border shadow-md text-blue-500 h-8 aspect-square flex justify-center items-center rounded-full"
        >
          {'>'}
        </button>
      </div>
    </section>
  );
};

export default TestimonialSection;
