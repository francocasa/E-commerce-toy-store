import { useParams } from 'react-router-dom';
import { dbProducts } from '../data/DbProducts'; // Asegúrate de que esto sea correcto
import { ProductDetailPreCart } from '../components';

function DetailsProductPage() {
  const { id } = useParams();
  const product = dbProducts.find((p) => p.id === id); // Asegúrate de usar dbProducts

  if (!product)
    return <p className="text-center text-red-500">Producto no encontrado</p>;

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna 1: Imagen del producto */}
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover mb-4 md:h-auto"
          />
        </div>

        {/* Columna 2: Detalles del producto */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {product.title}
          </h1>
          <p className="text-xl mb-2">${product.price.toFixed(2)}</p>
          <p className="text-md mb-2">
            <strong>Marca:</strong> {product.marca}
          </p>
          <p className="text-md mb-2">
            <strong>Material:</strong> {product.material}
          </p>
          <p className="text-md mb-2">
            <strong>Categoría:</strong> {product.category}
          </p>

          {/* Sección de promociones si aplica */}
          {product.promocion === 'true' && (
            <div className="mt-4 border-t pt-4">
              <h2 className="text-xl font-bold mb-2">PROMOCIÓN</h2>
              <h3 className="text-lg font-bold mb-2">
                {product.categoryPromo}
              </h3>
              <p className="text-md mb-2">{product.descriptionPromo}</p>
            </div>
          )}
        </div>

        {/* Columna 3: Componente de pre-carrito */}
        <ProductDetailPreCart product={product} />
      </div>
    </main>
  );
}

export default DetailsProductPage;
