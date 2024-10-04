import { useEffect, useState, useRef } from 'react';
import ProductCard from './ProductCard';
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
          className="flex gap-3 overflow-x-scroll no-scrollbar p-2"
        >
          {/* Mapear los productos */}
          {products.map((product) => (
            <div className="min-w-60" key={product.id}>
              <ProductCard product={product} />
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
