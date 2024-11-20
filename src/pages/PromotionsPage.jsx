import { useState, useEffect } from 'react';
import { consultaProductos, consultaDescuentos } from '../services/products'; // Importa las funciones de consulta
import { ProductCard, CategoryFilter } from '../components';

function PromotionsPage() {
  const [selectedCategoryPromo, setSelectedCategoryPromo] = useState('');
  const [promotions, setPromotions] = useState([]); // Estado para las promociones
  const [discounts, setDiscounts] = useState([]); // Estado para los descuentos
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
        setError('Error al cargar los descuentos');
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
          setPromotions(filteredPromotions); // Guarda las promociones filtradas
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

  // Filtra las promociones para obtener solo las categorías que tienen productos asociados
  const categoriesWithPromotions = discounts.filter((discount) => {
    return promotions.some((product) => product.discountId === discount.id);
  });

  const filteredPromotions = promotions.filter((product) => {
    if (selectedCategoryPromo === 'Todas') {
      return product.discountId !== null; // Solo mostrar productos con discountId no nulo
    }
    return (
      selectedCategoryPromo === '' ||
      product.discountId === selectedCategoryPromo
    );
  });

  if (loading) return <p>Cargando promociones...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <main className="container mx-auto mt-8 mb-12">
      <section className="mx-9">
        <h2 className="text-2xl font-bold mb-4">Promociones</h2>

        <div className="mb-8">
          <CategoryFilter
            categories={categoriesWithPromotions} // Solo pasamos las categorías con productos asociados
            selectedCategory={selectedCategoryPromo}
            setSelectedCategory={setSelectedCategoryPromo}
          />
        </div>

        <div className="mx-auto w-fit grid gap-8 min-[500px]:grid-cols-2 md:grid-cols-3 md:gap-x-4 md:gap-y-6 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredPromotions.map((product) => (
            <div className="max-w-60 mx-auto" key={product.id}>
              <ProductCard product={product} discounts={discounts} />{' '}
              {/* Pasar los descuentos aquí */}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default PromotionsPage;
