import { useEffect, useState } from 'react';
import { consultaTestimonios } from '../services/testimonials'; // Importa la función de consulta

function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]); // Estado para los testimonios
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        const data = await consultaTestimonios(); // Obtiene los testimonios
        setTestimonials(data); // Guarda los testimonios en el estado
      } catch (err) {
        setError('Error al cargar testimonios');
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  if (loading) return <p>Cargando testimonios...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

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
