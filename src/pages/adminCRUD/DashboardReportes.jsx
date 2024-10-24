import { useEffect, useState } from 'react';
import { fetchAdminData } from '../../services/admins'; // Ajusta según tu ruta

function DashboardReportes() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = localStorage.getItem('adminToken'); // Cambia esto si el nombre del token es diferente
      if (!token) {
        window.location.href = '/login'; // Redirigir si no hay un admin logueado
        return;
      }

      try {
        const adminData = await fetchAdminData(); // Obtén datos del admin
        setAdmin(adminData); // Suponiendo que fetchAdminData devuelve el objeto del admin
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }

      setLoading(false);
    };

    checkAdminStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Limpiar el token
    window.location.href = '/login'; // Cambia esto por la ruta adecuada
  };

  if (loading) return <p>Cargando...</p>;

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
