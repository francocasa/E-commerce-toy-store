import PropTypes from 'prop-types'; // Importar PropTypes
import { Link } from 'react-router-dom';

function CategoryCard({ category }) {
  return (
    <div className="border p-4 rounded-lg shadow-lg w-[270px] mx-auto">
      {' '}
      {/* Ancho fijo de 270 px */}
      <div className="flex justify-center mb-4">
        {' '}
        {/* Contenedor flex para centrar la imagen */}
        <img
          src={category.image}
          alt={category.title}
          className="w-auto h-40 object-cover" // Mantiene el ajuste de la imagen
        />
      </div>
      <h3 className="text-lg font-bold text-center">
        {category.title.toUpperCase()}
      </h3>
      <Link
        to={`/products/${category.title}`}
        className="text-blue-500 text-center block"
      >
        Ver más
      </Link>
    </div>
  );
}

// Validación de PropTypes
CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryCard;
