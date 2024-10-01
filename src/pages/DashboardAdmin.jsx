import { useEffect, useState } from 'react';
import { getLoggedAdmin } from '../data/DbUsers'; // Asegúrate de que la ruta sea correcta

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const loggedAdmin = getLoggedAdmin();
    if (loggedAdmin) {
      setAdmin(loggedAdmin);
    } else {
      // Redirigir a la página de login si no hay un admin logueado
      window.location.href = '/login'; // Cambia esto por la ruta adecuada
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('AdminLogueado');
    window.location.href = '/login'; // Cambia esto por la ruta adecuada
  };

  if (!admin) return null; // Muestra nada mientras se carga

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold">Bienvenido, {admin.name}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded mt-4"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

export default AdminDashboard;
