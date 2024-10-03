import { useEffect, useState } from 'react';
import { CategorieCard as CategoryCard } from '../components';
import { consultaDatos } from '../services/categories'; // Importa la función

function CategoriesPage() {
  const [categories, setCategories] = useState([]); // Estado para las categorías

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await consultaDatos(); // Llama a la función para obtener los datos
      setCategories(data); // Guarda las categorías en el estado
    };

    fetchCategories();
  }, []); // Solo ejecuta una vez al montar el componente

  return (
    <main className="my-8">
      <section className="mx-9">
        <h2 className="text-2xl font-bold mb-4 ml-4">Categorías</h2>
        {console.log(categories)}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default CategoriesPage;
