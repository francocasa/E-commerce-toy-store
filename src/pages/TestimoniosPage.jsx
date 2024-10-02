import { testimonials } from '../data/Testimonios'; // Asegúrate de que la ruta sea correcta

function TestimonialsPage() {
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
