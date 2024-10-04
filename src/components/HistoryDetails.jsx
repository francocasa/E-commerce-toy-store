import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes
import { consultaProductos } from '../services/products'; // Importa el servicio

function HistoryDetails({ purchases }) {
  const [products, setProducts] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Inicia carga
      const data = await consultaProductos(); // Usa el servicio
      if (data) {
        setProducts(data);
        setProducts(data);
      } else {
        setError('Error al cargar los productos');
      }
      setLoading(false); // Finaliza carga
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Cargando historial...</p>; // Mensaje de carga
  if (error) return <p className="text-center text-red-500">{error}</p>; // Manejo de error

  return (
    <>
      <div className="border p-4 rounded-lg shadow-lg w-[270px] md:w-[600px] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase ">
            <tr>
              <th scope="col" className="md:px-6 md:py-3 md:hidden">
                ID
              </th>
              <th scope="col" className="md:px-6 md:py-3 hidden md:block">
                ID de producto
              </th>
              <th scope="col" className="md:px-6 md:py-3">
                Producto
              </th>
              <th scope="col" className="md:px-6 md:py-3 md:hidden">
                Cant
              </th>
              <th scope="col" className="md:px-6 md:py-3 hidden md:block">
                Cantidad
              </th>
              <th scope="col" className="md:px-6 md:py-3">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr className="bg-white border-b" key={purchase.id}>
                <>
                  <th
                    scope="row"
                    className="md:px-6 md:py-4 font-medium whitespace-nowrap text-gray-600"
                  >
                    {purchase.id}
                  </th>
                  <td className="md:px-6 md:py-4 text-gray-600">
                    {
                      products.filter((product) => product.id == purchase.id)[0]
                        .title
                    }
                  </td>
                  <td className="md:px-6 md:py-4 text-gray-600">
                    {purchase.amount}
                  </td>
                  <td className="md:px-6 md:py-4 text-gray-600">
                    ${purchase.price}
                  </td>
                </>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// Validación de PropTypes
HistoryDetails.propTypes = {
  purchases: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default HistoryDetails;
