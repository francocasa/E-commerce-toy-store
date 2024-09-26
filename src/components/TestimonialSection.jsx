import { useRef } from 'react';
import { testimonials } from '../data/Testimonios'; // Asegúrate de que la ruta sea correcta

const TestimonialSection = () => {
  const scrollRef = useRef(null); // Referencia al contenedor

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' }); // Ajusta el valor de desplazamiento
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' }); // Ajusta el valor de desplazamiento
    }
  };

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">Testimonios</h2>
        <a href="#" className="text-blue-600 hover:underline">
          Ver todo &rarr;
        </a>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-scroll no-scrollbar"
        >
          {/* Mapear los testimonios desde el archivo */}
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="min-w-[150px] bg-white shadow-md p-4 rounded-md text-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.nombrePersona}
                className="w-24 h-24 object-cover rounded-full mx-auto"
              />
              <p className="mt-4">
                &quot;Me gustó mucho el producto, cumple lo prometido&quot;
              </p>{' '}
              {/* Comillas escapadas */}
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
