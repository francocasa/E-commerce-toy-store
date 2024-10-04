import { useState, useEffect } from 'react';
import { getUserProfile } from '../services/userprofile'; // Importa el servicio
import { Link, useParams } from 'react-router-dom';
import { HistoryDetails } from '../components';

function HistoryPage() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Inicia carga
      const data = await getUserProfile(id); // Usa el servicio
      if (data) {
        setUserProfile(data);
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
    <main className="my-8">
      <section className="mx-9">
        <h2 className="text-2xl font-bold mb-4">Historial de compras</h2>
        <div className="border p-4 rounded-lg shadow-lg w-[270px] md:w-[600px] mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase ">
              <tr>
                <th scope="col" className="md:px-6 md:py-3 md:hidden">
                  ID
                </th>
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
              {userProfile.history.map((history) => (
                <tr className="bg-white border-b" key={history.id}>
                  <>
                    <th
                      scope="row"
                      className="md:px-6 md:py-4 font-medium whitespace-nowrap text-gray-600"
                    >
                      {history.id}
                    </th>
                    <td className="md:px-6 md:py-4 text-gray-600">
                      {history.date}
                    </td>
                    <td className="md:px-6 md:py-4 text-gray-600">
                      ${history.total}
                    </td>
                    <td className="md:px-6 md:py-4">
                      <Link to={`/`} className="text-blue-500">
                        Ver más
                      </Link>
                    </td>
                  </>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <HistoryDetails />
      </section>
    </main>
  );
}

export default HistoryPage;
