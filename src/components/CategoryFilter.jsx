import PropTypes from 'prop-types';

const CategoryFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="mb-4">
      <label className="mr-2 text-lg" htmlFor="category-select">
        Filtrar por categoría:
      </label>
      <select
        id="category-select"
        value={selectedCategory || ''}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Todas</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

// Validación de prop-types
CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
