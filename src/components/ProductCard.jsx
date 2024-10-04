import PropTypes from 'prop-types'; // Importar PropTypes
import VerMas from './VerMas';

function ProductCard({ product }) {
  let price = product.price;
  let promo = '';

  // Aplicar descuento del 30% si categoryPromo es 'Navidad'
  if (product.categoryPromo === 'Navidad') {
    price = price * 0.7; // 30% de descuento
    promo = '$' + price.toFixed(2); // 30% de descuento
  }

  // Aplicar descuento del 33.33% si categoryPromo es '3x2' y la cantidad es múltiplo de 3
  if (product.categoryPromo === '3x2') {
    promo = '3x $' + price * 2; // 33.33% de descuento
  }

  return (
    <div className="border px-4 py-6 rounded-lg shadow-lg w-full mx-auto">
      {/* Ancho fijo de 270 px */}
      <div className="flex justify-center mb-4">
        {/* Contenedor flex para centrar la imagen */}
        <img
          src={product.image}
          alt={product.title}
          className="w-auto h-40 object-cover" // Mantiene el ajuste de la imagen
        />
      </div>
      <h3 className="text-lg font-bold text-center mb-1">{product.title}</h3>
      {promo !== '' ? (
        <div className="text-gray-600 mb-3 text-center flex justify-center gap-3 items-center h-7">
          <span className="bg-red-600 text-xs text-white font-medium rounded-md py-1 px-2">
            {product.categoryPromo}
          </span>
          {product.price !== price ? (
            <span className="text-sm font-medium text-gray-400 line-through ">
              ${product.price.toFixed(2)}
            </span>
          ) : (
            <span>${product.price}</span>
          )}
          <span className="font-bold">{promo}</span>
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
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    categoryPromo: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
