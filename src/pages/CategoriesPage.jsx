import { useEffect, useState } from 'react';
import { CategorieCard as CategoryCard } from '../components';
import { consultaDatos } from '../services/categories'; // Importa la función

function CategoriesPage() {
  const [categories, setCategories] = useState([]); // Estado para las categorías
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); // Inicia carga
      const data = await consultaDatos(); // Llama a la función para obtener los datos
      if (data) {
        setCategories(data); // Guarda las categorías en el estado
      } else {
        setError('Error al cargar los productos');
      }
      setLoading(false); // Finaliza carga
    };

    fetchCategories();
  }, []); // Solo ejecuta una vez al montar el componente

  if (loading) return <p>Cargando categorias...</p>; // Mensaje de carga
  if (error) return <p className="text-center text-red-500">{error}</p>; // Manejo de error

  return (
    <main className="container mx-auto my-8">
      <section className="mx-9">
        <h2 className="text-2xl font-bold mb-4">Categorías</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <div className="w-4/5 max-w-80" key={category.id}>
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default CategoriesPage;
