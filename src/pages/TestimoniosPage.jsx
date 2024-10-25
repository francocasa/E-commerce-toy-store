import { useState } from 'react';

function TestimonialsPage() {
  // Datos estáticos de testimonios
  const testimonialsData = [
    {
      id: 'test1',
      nombrePersona: 'Miguel Pariona',
      image: '/Perfil/photo_1.png',
      mensaje: 'Me gustó mucho el carrito.',
    },
    {
      id: 'test2',
      nombrePersona: 'Juan Pérez',
      image: '/Perfil/photo_2.png',
      mensaje: 'Me gustó el tractor.',
    },
    {
      id: 'test3',
      nombrePersona: 'Ana Gómez',
      image: '/Perfil/photo_3.png',
      mensaje: 'Excelente calidad en los juguetes.',
    },
    {
      id: 'test4',
      nombrePersona: 'Luis Fernández',
      image: '/Perfil/photo_4.png',
      mensaje: 'Los precios son muy accesibles.',
    },
    {
      id: 'test5',
      nombrePersona: 'Sofía López',
      image: '/Perfil/photo_5.png',
      mensaje: 'Gran variedad de productos.',
    },
    {
      id: 'test6',
      nombrePersona: 'Carlos Rodríguez',
      image: '/Perfil/photo_6.png',
      mensaje: 'Me encantó la atención al cliente.',
    },
  ];

  const [testimonials] = useState(testimonialsData); // Estado para los testimonios

  return (
    <main className="my-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Testimonios</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-gray-100 p-4 rounded-md shadow-md transition-transform transform hover:scale-105"
          >
            <img
              src={testimonial.image}
              alt={testimonial.nombrePersona}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-center">
              {testimonial.nombrePersona}
            </h3>
            <p className="text-gray-600 text-center mt-2">
              {testimonial.mensaje}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default TestimonialsPage;
