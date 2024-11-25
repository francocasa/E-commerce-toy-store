import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes
import { consultaProductoPorId } from '../services/products'; // Importa la función para consultar productos

function HistoryDetails({ purchases }) {
  const [productDetails, setProductDetails] = useState([]); // Estado para los detalles de productos
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Inicia carga
      const productsData = await Promise.all(
        purchases.map((purchase) => consultaProductoPorId(purchase.productId)), // Obtener producto por ID
      );

      const validProducts = productsData.filter((product) => product !== null); // Filtrar productos válidos
      setProductDetails(validProducts);
      setLoading(false); // Finaliza carga
    };

    fetchProducts();
  }, [purchases]);

  if (loading) return <p>Cargando productos...</p>; // Mensaje de carga

  return (
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
            <th scope="col" className="md:px-6 md:py-3 hidden md:block">
              Cantidad
            </th>
            <th scope="col" className="md:px-6 md:py-3">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => {
            const product = productDetails.find(
              (p) => p.id === purchase.productId,
            ); // Busca el producto correspondiente
            return (
              <tr className="bg-white border-b" key={purchase.productId}>
                <th
                  scope="row"
                  className="md:px-6 md:py-4 text-gray-600  md:hidden"
                >
                  {purchase.productId.substring(0, 13) + '-'}
                  {purchase.productId.substring(13)}
                </th>
                <th
                  scope="row"
                  className="md:px-6 md:py-4 text-gray-600 hidden md:block"
                >
                  {purchase.productId}
                </th>
                <td className="md:px-6 md:py-4 text-gray-600">
                  {product ? product.name : 'Producto no encontrado'}{' '}
                  {/* Nombre del producto */}
                </td>
                <td className="md:px-6 md:py-4 text-gray-600 hidden md:block">
                  {purchase.quantity} {/* Cantidad */}
                </td>
                <td className="md:px-6 md:py-4 text-gray-600">
                  ${purchase.totalAmount.toFixed(2)} {/* Precio */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// Validación de PropTypes
HistoryDetails.propTypes = {
  purchases: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default HistoryDetails;
