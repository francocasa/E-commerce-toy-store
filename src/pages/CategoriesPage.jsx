import { dbCategories } from '../data/DbCategories'; // Asegúrate de que la ruta sea correcta
import { CategorieCard } from '../components';

function CategoriesPage() {
  return (
    <main className="my-8">
      <h2 className="text-2xl font-bold mb-4 ml-4">Categorias</h2>
      {console.log(dbCategories)}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dbCategories.map((categorie) => (
          <CategorieCard key={categorie.id} categorie={categorie} />
        ))}
      </div>
    </main>
  );
}

export default CategoriesPage;
