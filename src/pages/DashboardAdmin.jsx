import { useEffect, useState } from 'react';
import { PersonCircle } from 'react-bootstrap-icons'; // Asegúrate de tener esta librería

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminData = localStorage.getItem('AdminLogueado');
    const token = localStorage.getItem('adminToken');

    if (!token || !adminData) {
      window.location.href = '/login'; // Redirigir si no hay un admin logueado
      return;
    }

    setAdmin(JSON.parse(adminData)); // Parsear y establecer los datos del admin
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('AdminLogueado');
    localStorage.removeItem('adminToken'); // Opcional
    window.location.href = '/login'; // Cambia esto por la ruta adecuada
  };

  if (!admin) return null; // Muestra nada mientras se carga

  return (
    <main className="my-8">
      <div className="container mx-auto p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-1 pr-8">
            {' '}
            {/* Padding a la derecha para espacio */}
            <h1 className="text-2xl font-bold mb-2">
              Bienvenido, {admin.fullName}
            </h1>
            <p className="text-gray-700">Username: {admin.username}</p>
            <p className="text-gray-700">Email: {admin.email}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600 transition duration-200 mt-4"
            >
              Cerrar Sesión
            </button>
          </div>
          <div className="flex-shrink-0">
            {' '}
            {/* Evitar que se reduzca */}
            {admin.profileImage ? (
              <img
                src={admin.profileImage}
                alt={`${admin.fullName}'s profile`}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full">
                <PersonCircle className="text-gray-500 w-16 h-16" />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;
