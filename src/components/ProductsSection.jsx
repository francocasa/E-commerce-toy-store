import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { consultaProductos } from '../services/products'; // Importa la función de consulta

const ProductsSection = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const scrollRef = useRef(null); // Referencia al contenedor

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await consultaProductos(); // Usar la función del servicio
      setProducts(data); // Guarda los productos en el estado
    };

    fetchProducts();
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
        <h2 className="text-2xl font-semibold">Juguetes</h2>
        <a href="/products" className="text-blue-600 hover:underline">
          Ver todo &rarr;
        </a>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-scroll no-scrollbar"
        >
          {/* Mapear los productos */}
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[200px] sm:min-w-[250px] md:min-w-[300px] bg-white shadow-md p-4 rounded-md"
            >
              <div className="h-[160px] flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-auto w-auto object-cover rounded-md"
                  style={{ maxHeight: '150px' }}
                />
              </div>

              <h3 className="text-lg mt-2 font-medium text-center">
                {product.title}
              </h3>
              <p className="text-gray-500 text-center">
                ${product.price.toFixed(2)}
              </p>
              <Link
                to={`/detailsproduct/${product.id}`}
                className="text-blue-600 hover:underline text-center block"
              >
                Ver producto
              </Link>
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
