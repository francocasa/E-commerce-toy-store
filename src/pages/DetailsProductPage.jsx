import { useParams } from 'react-router-dom';
import { products } from '../data/Products';

function DetailsProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-full h-64 object-cover mb-4" />
      <p className="text-xl">${product.price.toFixed(2)}</p>
    </div>
  );
}

export default DetailsProductPage;
