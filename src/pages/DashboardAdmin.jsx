import { useEffect, useState } from 'react';
import { getLoggedAdmin } from '../services/usersadmin'; // Asegúrate de que la ruta sea correcta

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
    <main className="my-8">
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Bienvenido, {admin.name}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600 transition duration-200"
        >
          Cerrar Sesión
        </button>
      </div>
    </main>
  );
}

export default AdminDashboard;
