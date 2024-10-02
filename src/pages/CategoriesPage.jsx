import { dbCategories } from '../data/DbCategories';
import { CategorieCard as CategoryCard } from '../components';

function CategoriesPage() {
  return (
    <main className="my-8">
      <section className="mx-9">
        <h2 className="text-2xl font-bold mb-4 ml-4">Categorías</h2>
        {console.log(dbCategories)}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dbCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default CategoriesPage;
