import PropTypes from 'prop-types'; // Importar PropTypes
import VerMas from './VerMas';

function CategoryCard({ category }) {
  // Manejo de la imagen

  return (
    <div className="w-full mx-auto min-w-52  space-y-3">
      {/* Ancho fijo de 270 px */}
      <div className="flex justify-center">
        {category.image ? (
          <img
            crossOrigin="anonymous"
            src={category.image}
            alt={category.name}
            className="object-cover border border-gray-200 rounded-md h-52 w-52 lg:h-60 lg:min-w-60"
          />
        ) : (
          <p className="h-full w-full border border-gray-200 rounded-md flex justify-center items-center min-h-52 lg:min-h-60 lg:w-60">
            Imagen no disponible
          </p>
        )}
      </div>
      <h3 className="text-lg font-bold text-center">
        {category.name.toUpperCase()}
      </h3>

      <VerMas link={`/products/${category.id}`} text="Ver productos" />
    </div>
  );
}

// Validación de PropTypes
CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default CategoryCard;
