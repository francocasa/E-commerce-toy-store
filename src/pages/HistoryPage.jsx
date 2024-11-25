import { useState, useEffect } from 'react';
import { getUserProfile } from '../services/users'; // Importa el servicio
import { HistoryDetails } from '../components';
import { useCounter } from '../components/counter/Context';
import { consultaOrdenesPorUsuario } from '../services/orders'; // Importa el servicio

function HistoryPage() {
  const { user } = useCounter();
  const [history, setHistory] = useState([]); // Estado para el historial
  const [historyDetail, setHistoryDetail] = useState([]); // Estado para la compra
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [idDetail, setIdDetail] = useState(null); // Cambiado a null para mejor manejo

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Inicia carga
      const data = await getUserProfile(user.id); // Usa el servicio
      if (data) {
        setHistory(data.orders || []); // Usa el nuevo campo 'orders'
      } else {
        setError('Error al cargar el historial');
      }
      setLoading(false); // Finaliza carga
    };

    fetchProducts();
  }, [user.id]); // Asegúrate de incluir id como dependencia

  const handleHistoryDetail = async (orderId) => {
    setLoading(true); // Inicia carga
    try {
      const token = sessionStorage.getItem('TokenId');
      const data = await consultaOrdenesPorUsuario(user.id, token); // Usa el servicio
      if (data) {
        const order = data.find((his) => his.id === orderId); // Busca la orden por orderId
        setHistoryDetail(order.items); // Almacena los detalles de los items de la orden
        setIdDetail(orderId); // Actualiza el ID de detalle
      } else {
        setError('Error al cargar los productos');
      }
    } catch (err) {
      setError('Error al cargar los productos');
    } finally {
      setLoading(false); // Finaliza carga
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
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((order) => (
                <tr className="bg-white border-b" key={order.orderId}>
                  <th scope="row" className="md:px-6 md:py-4 text-gray-600">
                    <button
                      className="text-blue-500"
                      onClick={() => handleHistoryDetail(order.id)}
                    >
                      {order.id}
                    </button>
                  </th>
                  <td className="md:px-6 md:py-4 text-gray-600">
                    {order.orderDate} {/* Cambiar según tu esquema */}
                  </td>
                  <td className="md:px-6 md:py-4 text-gray-600">
                    ${order.totalAmount} {/* Cambiar según tu esquema */}
                  </td>
                  <td className="md:px-6 md:py-4">{order.status}</td>
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
