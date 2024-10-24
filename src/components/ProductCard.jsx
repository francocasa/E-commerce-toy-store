import PropTypes from 'prop-types';
import VerMas from './VerMas';
import { useEffect, useState } from 'react';
const IMAGES_URL = import.meta.env.VITE_IMAGES_URL; // Obtener la URL base desde el .env

function ProductCard({ product, discounts }) {
  const [price, setPrice] = useState(product.price);
  const [promo, setPromo] = useState('');
  useEffect(() => {
    let updatedPrice = product.price;
    let discountPromo = '';

    // Aplicar descuento basado en discountId
    const discount = discounts.find((d) => d.id === product.discountId);
    if (discount) {
      updatedPrice *= 1 - discount.discount_amount; // Aplicar descuento
      discountPromo = discount.description; // Usar la descripción del descuento
    }

    setPrice(updatedPrice);
    setPromo(discountPromo);
  }, [product, discounts]);

  // Manejo de la imagen
  const imageUrl =
    Array.isArray(product.images) && product.images.length > 0
      ? IMAGES_URL + '/' + product.images[0].url
      : '';

  return (
    <div className="border px-4 py-6 rounded-lg shadow-lg w-full mx-auto">
      <div className="flex justify-center mb-4">
        <img
          crossOrigin="anonymous"
          src={imageUrl}
          alt={product.name}
          className="w-auto h-40 object-cover"
        />
      </div>
      <h3 className="text-lg font-bold text-center mb-1">{product.name}</h3>
      {promo !== '' ? (
        <div className="text-gray-600 mb-3 text-center flex justify-center gap-3 items-center h-7">
          <span className="bg-red-600 text-xs text-white font-medium rounded-md py-1 px-2">
            {promo}
          </span>
          {product.price !== price ? (
            <span className="text-sm font-medium text-gray-400 line-through ">
              ${product.price.toFixed(2)}
            </span>
          ) : (
            <span>${product.price}</span>
          )}
          <span className="font-bold">${price.toFixed(2)}</span>
        </div>
      ) : (
        <p className="text-gray-600 mb-3 text-center font-bold text-lg">
          ${product.price.toFixed(2)}
        </p>
      )}

      <VerMas link={`/detailsproduct/${product.id}`} />
    </div>
  );
}

// Validación de PropTypes
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
    price: PropTypes.number.isRequired,
    discountId: PropTypes.string,
  }).isRequired,
  discounts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      discount_amount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default ProductCard;
