import PropTypes from 'prop-types'; // Importar PropTypes
import { Link } from 'react-router-dom';
import { ArrowUpRightSquare } from 'react-bootstrap-icons';

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
    <div className="border p-4 rounded-lg shadow-lg w-[270px] mx-auto">
      {' '}
      {/* Ancho fijo de 270 px */}
      <div className="flex justify-center mb-4">
        {' '}
        {/* Contenedor flex para centrar la imagen */}
        <img
          src={product.image}
          alt={product.title}
          className="w-auto h-40 object-cover" // Mantiene el ajuste de la imagen
        />
      </div>
      <h3 className="text-lg font-bold text-center mb-1">{product.title}</h3>
      {promo !== '' ? (
        <p className="text-gray-600 mb-3 text-center">
          <div className="flex justify-center">
            <span className="bg-red-600 text-xs text-gray-400 rounded-md p-0.5 mr-2">
              {product.categoryPromo}
            </span>
            {product.price !== price ? (
              <p className="text-sm font-medium text-gray-400 line-through ">
                ${product.price.toFixed(2)}
              </p>
            ) : (
              <h1>${product.price}</h1>
            )}
          </div>
          {promo}
        </p>
      ) : (
        <p className="text-gray-600 mb-3 text-center font-bold text-lg">
          ${product.price.toFixed(2)}
        </p>
      )}
      <Link
        to={`/detailsproduct/${product.id}`}
        className="flex items-center gap-2 text-white font-medium py-2 px-3 bg-blue-500 rounded-md w-fit mx-auto cursor-pointer hover:bg-blue-400 transition"
      >
        <span>Ver más</span>
        <ArrowUpRightSquare />
      </Link>
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
