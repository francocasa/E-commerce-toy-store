import { useState } from 'react';
import { dbProducts } from '../data/DbProducts'; // Asegúrate de que la ruta sea correcta
import { ProductCard } from '../components';
import { CategoryFilter } from '../components'; // Asegúrate de importar el componente

function ProductsPage() {
  const categories = ['Educativo', 'Acción'];
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredProducts = dbProducts.filter((product) => {
    return (
      selectedCategory === '' || product.category.includes(selectedCategory) // Cambiado para verificar si la categoría está en el array
    );
  });

  return (
    <main className="my-8">
      <h2 className="text-2xl font-bold mb-4 ml-4">Productos</h2>

      <div className="ml-4">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default ProductsPage;
