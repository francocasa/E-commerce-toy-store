import { useState, useEffect } from 'react';
import { consultaProductos } from '../services/products'; // Importa el servicio
import { ProductCard } from '../components';
import { CategoryFilter } from '../components';
import { useParams } from 'react-router-dom';

function ProductsPage() {
  const { cat } = useParams();
  let categoria;

  const categories = ['Educativo', 'Acción'];
  categoria = cat || '';

  const [selectedCategory, setSelectedCategory] = useState(categoria);
  const [products, setProducts] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Inicia carga
      const data = await consultaProductos(); // Usa el servicio
      if (data) {
        setProducts(data);
      } else {
        setError('Error al cargar los productos');
      }
      setLoading(false); // Finaliza carga
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      selectedCategory === '' || product.category.includes(selectedCategory)
    );
  });

  if (loading) return <p>Cargando productos...</p>; // Mensaje de carga
  if (error) return <p className="text-center text-red-500">{error}</p>; // Manejo de error

  return (
    <main className="container mx-auto my-8">
      <section className="mx-9">
        <h2 className="text-2xl font-bold mb-4">Productos</h2>

        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {filteredProducts.map((product) => (
            <div className="w-4/5 max-w-80" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProductsPage;
