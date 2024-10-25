import { useEffect, useState } from 'react';
import { fetchAdminData, getLoggedAdmin } from '../services/usersadmin'; // Asegúrate de que la ruta sea correcta

function DashboardReportes() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    const checkAdminStatus = async () => {
      const loggedAdmin = getLoggedAdmin();
      if (loggedAdmin) {
        // Cargar datos del admin si está logueado
        const adminData = await fetchAdminData();
        const foundAdmin = adminData.find(
          (admin) => admin.id === loggedAdmin.id,
        );

        if (foundAdmin) {
          setAdmin(foundAdmin);
        }
      }
      setLoading(false); // Cambiar el estado de carga una vez verificado
    };

    checkAdminStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('AdminLogueado');
    window.location.href = '/login'; // Cambia esto por la ruta adecuada
  };

  if (loading) return <p>Cargando...</p>; // Mostrar un mensaje de carga

  if (!admin) {
    window.location.href = '/login'; // Redirigir si no hay un admin logueado
    return null;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold">Bienvenido, {admin.name}</h1>
      <p className="mt-4 text-5xl md:text-6xl lg:text-7xl text-center">
        Página en construcción
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-600 transition duration-200"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

export default DashboardReportes;
