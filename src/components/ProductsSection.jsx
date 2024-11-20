import { useEffect, useState, useRef } from 'react';
import ProductCard from './ProductCard';
import { consultaProductos, consultaDescuentos } from '../services/products'; // Importa la función de consulta

const ProductsSection = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [discounts, setDiscounts] = useState([]); // Estado para almacenar los descuentos
  const scrollRef = useRef(null); // Referencia al contenedor
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchDiscounts = async () => {
      setLoading(true);
      try {
        const data = await consultaDescuentos(); // Usa el servicio
        if (data) {
          setDiscounts(data);
        } else {
          setError('Error al cargar los descuentos');
        }
      } catch (err) {
        setError('Error al cargar los productos');
      } finally {
        setLoading(false); // Finaliza carga
      }
    };

    const fetchProductos = async () => {
      setLoading(true);
      try {
        const data = await consultaProductos(); // Usa el servicio
        if (data) {
          setProducts(data); // Guarda todos los productos sin filtrar
        } else {
          setError('Error al cargar los productos');
        }
      } catch (err) {
        setError('Error al cargar los productos');
      } finally {
        setLoading(false); // Finaliza carga
      }
    };

    fetchDiscounts();
    fetchProductos();
  }, []);

  if (loading) return <p>Cargando promociones...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

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
    <section className="my-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold">Juguetes</h2>
        <a href="/products" className="text-blue-500 hover:underline">
          Ver todo &rarr;
        </a>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-scroll no-scrollbar space-x-4 pb-2"
        >
          {/* Mapear los productos */}
          {products
            .sort((a, b) => a.description.localeCompare(b.description)) // Ordena por el atributo "name" de A a Z
            .map((product) => (
              <div className="min-w-52" key={product.id}>
                <ProductCard product={product} discounts={discounts} />{' '}
                {/* Asegúrate de pasar discounts aquí */}
              </div>
            ))}
        </div>

        {/* Controles para desplazamiento
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
        </button> */}
      </div>
    </section>
  );
};

export default ProductsSection;
