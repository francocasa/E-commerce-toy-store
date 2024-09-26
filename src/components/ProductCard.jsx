import PropTypes from 'prop-types'; // Importar PropTypes
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
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
      <h3 className="text-lg font-bold text-center">{product.title}</h3>
      <p className="text-gray-600 mb-4 text-center">
        ${product.price.toFixed(2)}
      </p>
      <Link
        to={`/detailsproduct/${product.id}`}
        className="text-blue-500 text-center block"
      >
        Ver más
      </Link>
    </div>
  );
}

// Validación de PropTypes
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
