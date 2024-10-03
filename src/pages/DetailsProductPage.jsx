import { useParams } from 'react-router-dom';
import { consultaProductoPorId } from '../services/products'; // Importa el servicio
import { AddToCart } from '../components';
import { useEffect, useState } from 'react';

function DetailsProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Estado para el producto
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true); // Inicia carga
      const data = await consultaProductoPorId(id); // Usa el servicio
      if (data) {
        setProduct(data);
      } else {
        setError('Producto no encontrado');
      }
      setLoading(false); // Finaliza carga
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Cargando...</p>; // Mensaje de carga
  if (error) return <p className="text-center text-red-500">{error}</p>; // Manejo de error
  if (!product)
    return <p className="text-center text-red-500">Producto no encontrado</p>;

  return (
    <main className="container mx-auto p-5">
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
        <div className="text-md space-y-2">
          <h1 className="font-bold text-2xl">{product.title}</h1>
          <p className="font-medium text-xl">${product.price.toFixed(2)}</p>
          <p className="">
            <strong>Marca:</strong> {product.marca}
          </p>
          <p className="">
            <strong>Material:</strong>{' '}
            <span className="capitalize">{product.material}</span>
          </p>
          <p className="">
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
        <AddToCart product={product} />
      </div>
    </main>
  );
}

export default DetailsProductPage;
