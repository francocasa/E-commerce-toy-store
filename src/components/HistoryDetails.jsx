// import { useState, useEffect } from 'react';
// import { getUserProfile } from '../services/userprofile'; // Importa el servicio
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types'; // Importar PropTypes

function HistoryDetails({ purchases }) {
  console.log(purchases);
  const { id } = useParams();
  // const [userProfile, setUserProfile] = useState([]); // Estado para los productos
  // const [loading, setLoading] = useState(true); // Estado de carga
  // const [error, setError] = useState(null); // Estado de error

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setLoading(true); // Inicia carga
  //     const data = await getUserProfile(id); // Usa el servicio
  //     if (data) {
  //       setUserProfile(data);
  //     } else {
  //       setError('Error al cargar los productos');
  //     }
  //     setLoading(false); // Finaliza carga
  //   };

  //   fetchProducts();
  // }, []);

  // if (loading) return <p>Cargando historial...</p>; // Mensaje de carga
  // if (error) return <p className="text-center text-red-500">{error}</p>; // Manejo de error

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Detalle de compra {id}</h2>
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
                Cantidad
              </th>
              <th scope="col" className="md:px-6 md:py-3">
                Total
              </th>
              <th scope="col" className="md:px-6 md:py-3">
                Imagen
              </th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr className="bg-white border-b" key={history.id}>
                <>
                  <th
                    scope="row"
                    className="md:px-6 md:py-4 font-medium whitespace-nowrap text-gray-600"
                  >
                    {purchase.id}
                  </th>
                  <td className="md:px-6 md:py-4 text-gray-600">
                    {purchase.amount}
                  </td>
                  <td className="md:px-6 md:py-4 text-gray-600">
                    ${purchase.price}
                  </td>
                  <td className="md:px-6 md:py-4"></td>
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
