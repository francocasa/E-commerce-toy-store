import { useRef, useEffect, useState } from 'react';
import { consultaTestimonios } from '../services/testimonials'; // Importar el servicio

const TestimonialSection = () => {
  const scrollRef = useRef(null); // Referencia al contenedor
  const [testimonials, setTestimonials] = useState([]); // Estado para los testimonios

  useEffect(() => {
    const fetchTestimonials = async () => {
      const data = await consultaTestimonios(); // Usar el servicio para obtener los testimonios
      setTestimonials(data); // Guarda los testimonios en el estado
    };

    fetchTestimonials();
  }, []);

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
          {/* Mapear los testimonios desde el estado */}
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
              <p className="mt-4">&quot;{testimonial.mensaje}&quot; </p>
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
