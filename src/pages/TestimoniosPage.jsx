import { testimonials } from '../data/Testimonios'; // Asegúrate de que la ruta sea correcta

function TestimonialsPage() {
  return (
    <main className="my-8">
      <h2 className="text-2xl font-bold mb-4 ml-4">Testimonios</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-gray-100 p-4 rounded-md shadow-md max-w-xs mx-auto"
          >
            <img
              src={testimonial.image}
              alt={testimonial.nombrePersona}
              className="w-24 h-auto rounded-full mx-auto mb-2"
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
