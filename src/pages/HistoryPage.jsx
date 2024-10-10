import { useState, useEffect } from 'react';
import { getUserProfile } from '../services/userprofile'; // Importa el servicio
import { consultaOrdenPorId } from '../services/orders'; // Importa la función de consulta
import { useParams } from 'react-router-dom';
import { HistoryDetails } from '../components';

function HistoryPage() {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [historyDetail, setHistoryDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idDetail, setIdDetail] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getUserProfile(id);
        if (data) {
          setHistory(data.orders || []);
        } else {
          setError('Error al cargar el historial');
        }
      } catch (error) {
        setError('Error al cargar el historial');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const handleHistoryDetail = async (orderId) => {
    setLoading(true);
    setIdDetail(orderId);
    try {
      const orderItems = await consultaOrdenPorId(orderId);
      setHistoryDetail(orderItems);
    } catch (error) {
      setError('Error al cargar los detalles de la orden');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando historial...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <main className="my-8">
      <section className="mx-9">
        <h2 className="text-2xl font-bold mb-4">Historial de compras</h2>
        <div className="border p-4 rounded-lg shadow-lg w-[270px] md:w-[600px] mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase">
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
                <tr className="bg-white border-b" key={order.id}>
                  <th
                    scope="row"
                    className="md:px-6 md:py-4 font-medium whitespace-nowrap text-gray-600"
                  >
                    {order.id}
                  </th>
                  <td className="md:px-6 md:py-4 text-gray-600">
                    {order.orderDate}
                  </td>
                  <td className="md:px-6 md:py-4 text-gray-600">
                    ${order.totalAmount}
                  </td>
                  <td className="md:px-6 md:py-4">
                    <button
                      className="text-blue-500"
                      onClick={() => handleHistoryDetail(order.id)}
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
            <HistoryDetails orderItems={historyDetail} />
          </>
        )}
      </section>
    </main>
  );
}

export default HistoryPage;
