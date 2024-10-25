import { useState, useEffect } from 'react';
import { consultaProductos, consultaDescuentos } from '../services/products'; // Importa las funciones de consulta
import { ProductCard, CategoryFilter } from '../components';

function PromotionsPage() {
  const categoriesPromo = ['Navidad', '3x2'];
  const [selectedCategoryPromo, setSelectedCategoryPromo] = useState('');
  const [promotions, setPromotions] = useState([]); // Estado para las promociones
  const [discounts, setDiscounts] = useState([]); // Estado para los descuentos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchPromotions = async () => {
      setLoading(true);
      try {
        const products = await consultaProductos(); // Obtiene los productos
        const discountsData = await consultaDescuentos(); // Obtiene los descuentos

        console.log('Productos:', products); // Ver la respuesta de productos
        console.log('Descuentos:', discountsData); // Ver la respuesta de descuentos

        const filteredPromotions = products.filter(
          (product) => product.discountId !== null, // Filtrar productos que tienen descuentos
        );
        setPromotions(filteredPromotions); // Guarda las promociones filtradas
        setDiscounts(discountsData); // Guarda los descuentos
      } catch (err) {
        setError('Error al cargar promociones');
      }
      setLoading(false);
    };

    fetchPromotions();
  }, []);

  const filteredPromotions = promotions.filter((product) => {
    if (selectedCategoryPromo === 'Todas') {
      return product.discountId !== null; // Solo mostrar productos con discountId no nulo
    }
    return (
      selectedCategoryPromo === '' ||
      product.discountId === (selectedCategoryPromo === 'Navidad' ? '2' : '1')
    );
  });

  if (loading) return <p>Cargando promociones...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <main className="container mx-auto my-8">
      <section className="mx-9">
        <h2 className="text-2xl font-bold mb-4">Promociones</h2>

        <div className="mb-8">
          <CategoryFilter
            categories={categoriesPromo}
            selectedCategory={selectedCategoryPromo}
            setSelectedCategory={setSelectedCategoryPromo}
          />
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {filteredPromotions.map((product) => (
            <div className="w-4/5 max-w-80" key={product.id}>
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
