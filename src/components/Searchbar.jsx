import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dbProducts } from '../data/DbProducts'; // Asegúrate de que la ruta sea correcta

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const results = dbProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm]);

  return (
    <div className="relative flex items-center bg-gray-100 px-4 py-2 rounded-md">
      <input
        type="text"
        placeholder="¿Qué deseas buscar?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent w-full outline-none text-gray-700"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {filteredProducts.length > 0 && (
        <div className="absolute top-full left-0 w-52 bg-white border rounded-md shadow-lg mt-1 z-10">
          {filteredProducts.map((product) => (
            <Link to={`/detailsproduct/${product.id}`} key={product.id}>
              <div className="flex items-center p-2 hover:bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-12 h-12 object-cover mr-2"
                />
                <p className="text-sm">{product.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
