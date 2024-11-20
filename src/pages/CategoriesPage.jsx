import { useEffect, useState } from 'react';
import { CategorieCard as CategoryCard } from '../components';
import { consultaDatos } from '../services/categories'; // Importa la función
import { consultaProductos } from '../services/products'; // Importa el servicio de productos

function CategoriesPage() {
  const [categories, setCategories] = useState([]); // Estado para las categorías
  const [products, setProducts] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      setLoading(true); // Inicia carga
      try {
        // Obtén las categorías y productos
        const categoriesData = await consultaDatos(); // Llama a la función para obtener las categorías
        const productsData = await consultaProductos(); // Llama a la función para obtener los productos

        if (categoriesData && productsData) {
          // Filtra las categorías que tienen productos asociados
          const categoriesWithProducts = categoriesData.filter((category) =>
            productsData.some((product) => product.categoryId === category.id),
          );

          setCategories(categoriesWithProducts); // Guarda las categorías que tienen productos
          setProducts(productsData); // Guarda los productos (esto puede ser útil en caso de necesitarlo para algún otro propósito)
        } else {
          setError('Error al cargar los datos');
        }
      } catch (err) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false); // Finaliza carga
      }
    };

    fetchCategoriesAndProducts();
  }, []); // Solo ejecuta una vez al montar el componente

  if (loading)
    return (
      <p className="grow flex justify-center items-center">
        Cargando categorías...
      </p>
    ); // Mensaje de carga
  if (error) return <p className="text-center text-red-500">{error}</p>; // Manejo de error

  return (
    <main className="container mx-auto my-8">
      <section className="mx-9">
        <h2 className="text-2xl font-bold mb-4">Categorías</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {categories
            .sort((a, b) => a.name.localeCompare(b.name)) // Ordena por el atributo "name" de A a Z
            .map((category) => (
              <div className="w-4/5 max-w-80" key={category.id}>
                <CategoryCard category={category} />{' '}
                {/* Mostrar las categorías filtradas */}
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}

export default CategoriesPage;
