import PropTypes from 'prop-types';

const CategoryFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="mb-4">
      <label className="mr-2" htmlFor="category-select">
        Filtrar por categoría:
      </label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2"
      >
        <option value="">Todas</option>
        {categories
          .sort((a, b) => a.description.localeCompare(b.description)) // Ordena por el atributo "name" de A a Z
          .map((category) => (
            <option key={category.id} value={category.id}>
              {category.description}
            </option>
          ))}
      </select>
    </div>
  );
};

// Validación de prop-types
CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default CategoryFilter; // Asegúrate de exportar el componente
