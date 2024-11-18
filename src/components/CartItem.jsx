import PropTypes from 'prop-types';
import {
  DashSquareFill,
  PlusSquareFill,
  TrashFill,
} from 'react-bootstrap-icons';
import { getProductById } from '../services/products';
import { getDiscountById } from '../services/discounts';
import { useEffect, useState } from 'react';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [product, setProduct] = useState({});
  const [finalPrice, setFinalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  console.log('item', item);

  useEffect(() => {
    const fetchProduct = async () => {
      const productResponse = await getProductById(item.productId);

      setProduct(productResponse);

      if (productResponse.discountId) {
        const discountResponse = await getDiscountById(
          productResponse.discountId,
        );

        setFinalPrice(productResponse.price * (1 - discountResponse.discount));
      }

      setLoading(false);

      console.log('product', productResponse);
    };

    fetchProduct();
  }, [item.productId]);

  // Si está cargando, muestra un indicador o un mensaje
  if (loading) {
    return <p className="text-gray-500">Cargando producto...</p>;
  }

  return (
    <article className="flex flex-row gap-5 px-3 py-4 relative md:py-5">
      <div className="h-24 overflow-hidden aspect-square flex justify-center items-center md:h-32">
        {product.images && product.images.length > 0 && (
          <img
            className="h-auto max-h-full"
            crossOrigin="anonymous"
            src={product.images[0].url}
            alt={title}
          />
        )}
      </div>
      <div className="flex-grow flex flex-col md:flex-row justify-between">
        <div className="flex flex-col justify-between flex-grow">
          <div className="text-sm md:text-base">
            <h2 className="font-medium text-base mb-2 me-4 md:text-lg">
              {product.name}
            </h2>
            <p className="text-slate-700">
              Precio inicial:{' '}
              <span className="font-medium">${product.price.toFixed(2)}</span>
            </p>
            <p className="text-slate-700">
              Precio final:{' '}
              <span className="font-medium">${finalPrice.toFixed(2)}</span>
            </p>
            <p className="text-slate-800">
              Subtotal{' '}
              <span className="font-bold">
                ${(finalPrice * item.quantity).toFixed(2)}
              </span>
            </p>
          </div>
          <div className="flex justify-start items-center gap-2 mt-2">
            <DashSquareFill
              className={`text-xl select-none ${item.quantity <= 1 ? 'text-gray-300 hover:text-gray-300 cursor-default' : 'text-blue-500 cursor-pointer hover:text-blue-400'}`}
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            />
            <p className="text-sm md:text-base">{item.quantity}</p>
            <PlusSquareFill
              className="text-xl text-blue-500 cursor-pointer hover:text-blue-400 select-none"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            />
          </div>
        </div>
      </div>
      <div className="absolute right-2 top-4 md:top-5">
        <TrashFill
          className="block text-gray-700 text-xl cursor-pointer hover:text-red-700 hover:scale-125 transition-all sm:text-2xl"
          onClick={() => onRemove(item.id)}
        />
      </div>
    </article>
  );
}

// Validación de tipos de las props
CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired, // Asegúrate de que sea un número
    cartId: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
