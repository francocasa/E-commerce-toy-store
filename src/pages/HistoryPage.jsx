import { useState, useEffect } from 'react';
import { getUserProfile } from '../services/users'; // Importa el servicio
import { useParams } from 'react-router-dom';
import { HistoryDetails } from '../components';

function HistoryPage() {
  const { id } = useParams();
  const [history, setHistory] = useState([]); // Estado para el historial
  const [historyDetail, setHistoryDetail] = useState([]); // Estado para la compra
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [idDetail, setIdDetail] = useState(null); // Cambiado a null para mejor manejo

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Inicia carga
      const data = await getUserProfile(id); // Usa el servicio
      if (data) {
        setHistory(data.orders || []); // Usa el nuevo campo 'orders'
      } else {
        setError('Error al cargar el historial');
      }
      setLoading(false); // Finaliza carga
    };

    fetchProducts();
  }, [id]); // Asegúrate de incluir id como dependencia

  const handleHistoryDetail = (orderId) => {
    const order = history.find((his) => his.orderId === orderId); // Busca la orden por orderId
    if (order) {
      setHistoryDetail(order.items); // Almacena los detalles de los items de la orden
      setIdDetail(orderId); // Actualiza el ID de detalle
    }
  };

  if (loading) return <p>Cargando historial...</p>; // Mensaje de carga
  if (error) return <p className="text-center text-red-500">{error}</p>; // Manejo de error

  return (
    <main className="my-8">
      <section className="mx-9">
        <h2 className="text-2xl font-bold mb-4">Historial de compras</h2>
        <div className="border p-4 rounded-lg shadow-lg w-[270px] md:w-[600px] mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase ">
              <tr>
                <th scope="col" className="md:px-6 md:py-3 hidden md:block">
                  ID de compra
                </th>
                <th scope="col" className="md:px-6 md:py-3">
                  Fecha
                </th>
                <th scope="col" className="md:px-6 md:py-3">
                  Total
                </th>
                <th scope="col" className="md:px-6 md:py-3">
                  Detalle
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((order) => (
                <tr className="bg-white border-b" key={order.orderId}>
                  <th
                    scope="row"
                    className="md:px-6 md:py-4 font-medium whitespace-nowrap text-gray-600"
                  >
                    {order.orderId}
                  </th>
                  <td className="md:px-6 md:py-4 text-gray-600">
                    {order.orderDate} {/* Cambiar según tu esquema */}
                  </td>
                  <td className="md:px-6 md:py-4 text-gray-600">
                    ${order.totalAmount} {/* Cambiar según tu esquema */}
                  </td>
                  <td className="md:px-6 md:py-4">
                    <button
                      className="text-blue-500"
                      onClick={() => handleHistoryDetail(order.orderId)}
                    >
                      Ver más
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {historyDetail.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4 mt-4">
              Detalle de compra {idDetail}
            </h2>
            <HistoryDetails
              purchases={historyDetail.map((item) => ({
                ...item,
                id: item.productId,
              }))}
            />
            {/* Mapea para agregar la propiedad id */}
          </>
        )}
      </section>
    </main>
  );
}

export default HistoryPage;
