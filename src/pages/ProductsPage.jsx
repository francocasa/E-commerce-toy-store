import { useState, useEffect } from 'react';
import { consultaProductos, consultaDescuentos } from '../services/products'; // Importa el servicio
import { consultaCategories } from '../services/categories'; // Importa el servicio
import { ProductCard, CategoryFilter } from '../components';
import { useParams } from 'react-router-dom';

function ProductsPage() {
  const { cat } = useParams();
  const categoria = cat || '';
  const [selectedCategory, setSelectedCategory] = useState(categoria);
  const [products, setProducts] = useState([]); // Estado para los productos
  const [categories, setCategories] = useState([]); // Estado para las categorías
  const [discounts, setDiscounts] = useState([]); // Estado para los descuentos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Inicia carga
      try {
        const data = await consultaProductos(); // Usa el servicio
        if (data) {
          setProducts(data);
        } else {
          setError('Error al cargar los productos');
        }
      } catch (err) {
        setError('Error al cargar los productos');
      } finally {
        setLoading(false); // Finaliza carga
      }
    };

    const fetchCategories = async () => {
      setLoading(true); // Inicia carga
      try {
        const data = await consultaCategories(); // Usa el servicio
        if (data) {
          setCategories(data);
        } else {
          setError('Error al cargar las categorias');
        }
      } catch (err) {
        setError('Error al cargar las categorias');
      } finally {
        setLoading(false); // Finaliza carga
      }
    };

    const fetchDiscounts = async () => {
      try {
        const data = await consultaDescuentos(); // Asegúrate de que este servicio esté definido
        if (data) {
          setDiscounts(data);
        } else {
          setError('Error al cargar los descuentos');
        }
      } catch (err) {
        setError('Error al cargar los descuentos');
      }
    };

    fetchProducts();
    fetchCategories(); // Este código se ejecuta solo una vez al cargar la página
    fetchDiscounts();
  }, []);

  // Filtra las categorías que tienen productos asociados
  const categoriesWithProducts = categories.filter((category) => {
    return products.some((product) => product.categoryId === category.id);
  });

  // Filtra los productos según la categoría seleccionada
  const filteredProducts = products.filter((product) => {
    return selectedCategory === '' || product.categoryId === selectedCategory;
  });

  if (loading) return <p>Cargando productos...</p>; // Mensaje de carga
  if (error) return <p className="text-center text-red-500">{error}</p>; // Manejo de error

  return (
    <main className="container mx-auto mt-8 mb-12">
      <section className="mx-9">
        <h2 className="text-2xl font-bold mb-4">Productos</h2>

        <div className="mb-8">
          <CategoryFilter
            categories={categoriesWithProducts} // Solo pasamos las categorías que tienen productos asociados
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <div className="mx-auto w-fit grid gap-8 min-[500px]:grid-cols-2 md:grid-cols-3 md:gap-x-4 md:gap-y-6 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredProducts
            .sort((a, b) => a.name.localeCompare(b.name)) // Ordena por el atributo "name" de A a Z
            .map((product) => (
              <div className="max-w-60 mx-auto" key={product.id}>
                <ProductCard product={product} discounts={discounts} />{' '}
                {/* Pasa el producto y los descuentos */}
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}

export default ProductsPage;
