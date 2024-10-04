import { useState, useEffect } from 'react';
import { consultaProductos } from '../services/products'; // Importa la función de consulta
import { ProductCard, CategoryFilter } from '../components';

function PromotionsPage() {
  const categoriesPromo = ['Navidad', '3x2'];
  const [selectedCategoryPromo, setSelectedCategoryPromo] = useState('');
  const [promotions, setPromotions] = useState([]); // Estado para las promociones
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchPromotions = async () => {
      setLoading(true);
      try {
        const data = await consultaProductos(); // Obtiene los productos
        console.log(data); // Ver la respuesta
        const filteredPromotions = data.filter(
          (product) => product.promocion === true,
        ); // Cambiado a booleano
        setPromotions(filteredPromotions); // Guarda las promociones filtradas
      } catch (err) {
        setError('Error al cargar promociones');
      }
      setLoading(false);
    };

    fetchPromotions();
  }, []);

  const filteredPromotions = promotions.filter(
    (product) =>
      selectedCategoryPromo === '' ||
      selectedCategoryPromo === 'Todas' ||
      product.categoryPromo === selectedCategoryPromo,
  );

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
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default PromotionsPage;
