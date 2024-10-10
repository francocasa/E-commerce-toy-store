import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { consultaProductoPorId } from '../services/products';

function HistoryDetails({ orderItems }) {
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productsData = await Promise.all(
        orderItems.map(async (item) => {
          const product = await consultaProductoPorId(item.productId);
          return {
            ...item,
            name: product ? product.name : 'Producto no encontrado',
            price: product ? product.price : 0,
          };
        }),
      );

      setProductDetails(productsData);
      setLoading(false);
    };

    fetchProducts();
  }, [orderItems]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="border p-4 rounded-lg shadow-lg w-[270px] md:w-[600px] mx-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase">
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
          {productDetails.map((item) => (
            <tr className="bg-white border-b" key={item.productId}>
              <th
                scope="row"
                className="md:px-6 md:py-4 font-medium whitespace-nowrap text-gray-600"
              >
                {item.productId}
              </th>
              <td className="md:px-6 md:py-4 text-gray-600">{item.name}</td>
              <td className="md:px-6 md:py-4 text-gray-600">{item.quantity}</td>
              <td className="md:px-6 md:py-4 text-gray-600">
                ${item.price.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

HistoryDetails.propTypes = {
  orderItems: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default HistoryDetails;
