import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { consultaProductos } from '../services/products'; // Importa la función de consulta

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await consultaProductos(); // Usar la función del servicio
        setProducts(data); // Guarda los productos en el estado
      } catch (error) {
        setError('Error al cargar productos'); // Manejar el error
      } finally {
        setLoading(false); // Finaliza carga
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = products.filter(
        (product) =>
          product.name &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]); // Añadir products a la dependencia

  return (
    <div className="relative flex items-center bg-gray-100 py-1 px-2 lg:px-4 lg:py-2 rounded-md">
      <input
        type="text"
        placeholder="Buscar juguetes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent w-full outline-none text-gray-700 text-sm lg:text-base"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 lg:h-6 lg:w-6 text-gray-500"
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
      {loading && <p className="text-sm">Cargando...</p>}{' '}
      {/* Mensaje de carga */}
      {error && <p className="text-red-500">{error}</p>}{' '}
      {/* Mensaje de error */}
      {filteredProducts.length > 0 && (
        <div className="absolute top-full left-0 w-52 bg-white border rounded-md shadow-lg mt-1 z-10">
          {filteredProducts.map((product) => (
            <Link to={`/detailsproduct/${product.id}`} key={product.id}>
              <div className="flex items-center p-2 hover:bg-gray-100">
                <img
                  src={product.image[0].url} // Asegúrate de usar la URL correcta de la imagen
                  alt={product.name}
                  className="w-12 h-12 object-cover mr-2"
                />
                <p className="text-sm">{product.name}</p>{' '}
                {/* Cambia title a name */}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
