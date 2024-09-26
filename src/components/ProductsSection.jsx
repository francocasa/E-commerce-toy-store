import { useRef } from 'react';
import { products } from '../data/Products'; // Asegúrate de que la ruta sea correcta

const ProductsSection = () => {
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
        <h2 className="text-2xl font-semibold">Juguetes</h2>
        <a href="/ProductsPage" className="text-blue-600 hover:underline">
          Ver todo &rarr;
        </a>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-scroll no-scrollbar"
        >
          {/* Mapear los productos */}
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[200px] bg-white shadow-md p-4 rounded-md"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg mt-2 font-medium">{product.title}</h3>
              <p className="text-gray-500">${product.price.toFixed(2)}</p>
              <a
                href="/product-detail"
                className="text-blue-600 hover:underline"
              >
                Ver producto
              </a>
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

export default ProductsSection;
