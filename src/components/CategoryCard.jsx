import PropTypes from 'prop-types'; // Importar PropTypes
import VerMas from './VerMas';

function CategoryCard({ category }) {
  return (
    <div className="border px-4 py-6 rounded-lg shadow-lg w-full mx-auto">
      <div className="flex justify-center mb-4">
        <img
          src={category.image}
          alt={category.name} // Cambiado de title a name
          className="w-auto h-40 object-cover"
        />
      </div>
      <h3 className="text-lg font-bold text-center">
        {category.name.toUpperCase()} {/* Cambiado de title a name */}
      </h3>
      <VerMas link={`/products/${category.name}`} />{' '}
      {/* Cambiado de title a name */}
    </div>
  );
}

// Validación de PropTypes
CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired, // Cambiado de title a name
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryCard;
