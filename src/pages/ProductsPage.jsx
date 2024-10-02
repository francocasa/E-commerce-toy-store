import { useState } from 'react';
import { dbProducts } from '../data/DbProducts';
import { ProductCard } from '../components';
import { CategoryFilter } from '../components';
import { useParams } from 'react-router-dom';

function ProductsPage() {
  const { cat } = useParams();
  let categoria;

  const categories = ['Educativo', 'Acción'];
  categoria = cat || '';

  const [selectedCategory, setSelectedCategory] = useState(categoria);

  const filteredProducts = dbProducts.filter((product) => {
    return (
      selectedCategory === '' || product.category.includes(selectedCategory)
    );
  });

  return (
    <main className="my-8">
      <section className="mx-9">
        <h2 className="text-2xl font-bold mb-4">Productos</h2>

        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProductsPage;
