<<<<<<< HEAD
import { useState } from 'react';
import { dbProducts } from '../data/DbProducts'; // Asegúrate de que la ruta sea correcta
import { ProductCard } from '../components';
import { CategoryFilter } from '../components'; // Asegúrate de importar el componente

function ProductsPage() {
  const categories = ['Educativo', 'Acción'];
  const [selectedCategory, setSelectedCategory] = useState('');
=======
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
  const [categories, setCategories] = useState([]); // Estado para los productos
  const [discounts, setDiscounts] = useState([]); // Estado para los descuentos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
>>>>>>> develop

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

    const fetchBrands = async () => {
      setLoading(true); // Inicia carga
      try {
        const data = await consultaCategories(); // Usa el servicio
        if (data) {
          setCategories(data);
        } else {
          setError('Error al cargar los productos');
        }
      } catch (err) {
        setError('Error al cargar los productos');
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
    fetchBrands(); // Este código se ejecuta solo una vez al cargar la página
    fetchDiscounts();
  }, []);

  const filteredProducts = products.filter((product) => {
    return selectedCategory === '' || product.categoryId === selectedCategory;
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
