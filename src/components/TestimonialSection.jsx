import { useRef } from 'react';

const TestimonialSection = () => {
  const scrollRef = useRef(null); // Referencia al contenedor

  // Datos estáticos de testimonios
  const testimonials = [
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
    <section className="py-10">
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
            <div
              key={testimonial.id}
              className="min-w-[150px] sm:min-w-[200px] md:min-w-[250px] bg-white shadow-md p-4 rounded-md text-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.nombrePersona}
                className="w-24 h-24 object-cover rounded-full mx-auto"
              />
              <p className="mt-4">&quot;{testimonial.mensaje}&quot;</p>
              <h4 className="text-lg mt-2 font-medium">
                {testimonial.nombrePersona}
              </h4>
            </div>
          ))}
        </div>

        {/* Controles para desplazamiento */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          {'<'}
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          {'>'}
        </button>
      </div>
    </section>
  );
};

export default TestimonialSection;
