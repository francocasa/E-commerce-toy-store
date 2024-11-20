import PropTypes from 'prop-types';
import VerMas from './VerMas';
import { useEffect, useState } from 'react';

function ProductCard({ product, discounts }) {
  const [price, setPrice] = useState(product.price);
  const [promo, setPromo] = useState('');
  useEffect(() => {
    let updatedPrice = product.price;
    let discountPromo = '';

    // Aplicar descuento basado en discountId
    const discount = discounts.find((d) => d.id === product.discountId);
    if (discount) {
      updatedPrice *= 1 - discount.discount; // Aplicar descuento
      discountPromo = discount.description; // Usar la descripción del descuento
    }

    setPrice(updatedPrice);
    setPromo(discountPromo);
  }, [product, discounts]);

  return (
    <div className="w-full mx-auto min-w-52">
      <div className="flex justify-center mb-4 position relative">
        {promo && (
          <span className="absolute top-2 left-2 bg-red-200 text-sm text-red-700 border border-red-700 font-bold rounded-md py-1 px-2">
            {promo}
          </span>
        )}
        {product.images.length > 0 ? (
          <img
            crossOrigin="anonymous"
            src={product.images[0].url}
            alt={product.name}
            className="object-cover border border-gray-200 rounded-md h-52 w-52 lg:h-60 lg:min-w-60"
          />
        ) : (
          <p className="h-full w-full border border-gray-200 rounded-md flex justify-center items-center min-h-52 lg:min-h-60 lg:w-60">
            Imagen no disponible
          </p>
        )}
      </div>
      <h3 className="text-xl font-bold mb-2">{product.name}</h3>

      <div className="flex justify-between items-center mb-3">
        <p className="text-gray-400 font-semibold">Precio</p>
        {promo !== '' ? (
          <div className="flex justify-end gap-2 items-center">
            {product.price !== price ? (
              <span className="text-sm font-medium text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            ) : (
              <span>${product.price}</span>
            )}
            <span className="text-end font-bold text-lg">
              ${price.toFixed(2)}
            </span>
          </div>
        ) : (
          <p className="text-end font-bold text-lg">
            ${product.price.toFixed(2)}
          </p>
        )}
      </div>
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
      discount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default ProductCard;
