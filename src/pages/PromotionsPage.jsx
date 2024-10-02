import { useState } from 'react';
import { dbProducts } from '../data/DbProducts';
import { ProductCard, CategoryFilter } from '../components';

function PromotionsPage() {
  const categoriesPromo = ['Navidad', '3x2'];
  const [selectedCategoryPromo, setSelectedCategoryPromo] = useState('');

  const filteredPromotions = dbProducts.filter(
    (product) =>
      product.promocion === 'true' &&
      (selectedCategoryPromo === '' ||
        product.categoryPromo === selectedCategoryPromo),
  );

  return (
    <main className="my-8">
      <section className="mx-9">
        <h2 className="text-2xl font-bold mb-4 ml-4">Promociones</h2>

        <div className="ml-4 mb-4">
          <CategoryFilter
            categories={categoriesPromo}
            selectedCategory={selectedCategoryPromo}
            setSelectedCategory={setSelectedCategoryPromo}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPromotions.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg max-w-sm mx-auto"
            >
              <h3 className="text-lg font-semibold mb-2 text-center">
                {product.categoryPromo}
              </h3>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default PromotionsPage;
