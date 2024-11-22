import { useState } from 'react';
import TestimonialCard from '../components/TestimonialCard';

function TestimonialsPage() {
  // Datos estáticos de testimonios
  const testimonialsData = [
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

  const [testimonials] = useState(testimonialsData); // Estado para los testimonios

  return (
    <main className="container mx-auto mt-8 mb-12">
      <section className="mx-9">
        <h2 className="text-2xl font-bold mb-6 text-center">Testimonios</h2>
        <div className="mx-auto w-fit grid gap-8 min-[500px]:grid-cols-2 md:grid-cols-3 md:gap-x-4 md:gap-y-6 xl:grid-cols-4 2xl:grid-cols-5">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-fit">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default TestimonialsPage;
