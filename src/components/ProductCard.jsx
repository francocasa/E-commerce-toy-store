import PropTypes from 'prop-types'; // Importar PropTypes
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover mb-4"
      />
      <h3 className="text-lg font-bold">{product.title}</h3>
      <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
      <Link to={`/detailsproduct/${product.id}`} className="text-blue-500">
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
