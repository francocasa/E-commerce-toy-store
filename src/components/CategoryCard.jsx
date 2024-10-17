import PropTypes from 'prop-types'; // Importar PropTypes
import VerMas from './VerMas';

function CategoryCard({ category }) {
  return (
    <div className="border px-4 py-6 rounded-lg shadow-lg w-full mx-auto">
      {/* Ancho fijo de 270 px */}
      <div className="flex justify-center mb-4">
        {/* Contenedor flex para centrar la imagen */}
        <img
          src={category.image}
          alt={category.name}
          className="w-auto h-40 object-cover" // Mantiene el ajuste de la imagen
        />
      </div>
      <h3 className="text-lg font-bold text-center">
        {category.name.toUpperCase()}
      </h3>

      <VerMas link={`/products/${category.id}`} />
    </div>
  );
}

// Validación de PropTypes
CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryCard;
