import { useParams } from 'react-router-dom';
import { products } from '../data/Products';
import { ProductDetailPreCart } from '../components';

function DetailsProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) return <p>Producto no encontrado</p>;

  return (
    <main className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna 1: Imagen del producto */}
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-auto h-64 object-cover mb-4"
          />
        </div>

        {/* Columna 2: Detalles del producto */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl mb-2">${product.price.toFixed(2)}</p>
          <p className="text-md mb-2">
            <strong>Descripción:</strong> {product.descripcion}
          </p>
          <p className="text-md mb-2">
            <strong>Marca:</strong> {product.marca}
          </p>
          <p className="text-md mb-2">
            <strong>Material:</strong> {product.material}
          </p>
        </div>

        {/* Columna 3: Componente de pre-carrito */}
        <ProductDetailPreCart product={product} />
      </div>
    </main>
  );
}

export default DetailsProductPage;
