import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';
import { consultaProductos, consultaDescuentos } from '../services/products'; // Importa la función de consulta

const PromotionSection = ({ selectedCategory }) => {
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
          const filteredPromotions = data.filter(
            (product) => product.discountId !== null, // Filtrar productos que tienen descuentos
          );
          setProducts(filteredPromotions); // Guarda todos los productos sin filtrar
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
    <section className="my-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold">Promociones</h2>
        <a href="/products" className="text-blue-500 hover:underline">
          Ver todo &rarr;
        </a>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-scroll no-scrollbar space-x-4 pb-2 md:space-x-3 lg:space-x-2"
        >
          {/* Mapear los productos */}
          {products.map((product) => (
            <div className="w-fit" key={product.id}>
              <ProductCard product={product} discounts={discounts} />{' '}
              {/* Asegúrate de pasar discounts aquí */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;
