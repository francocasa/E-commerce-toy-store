import { useEffect, useState } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';
import { useCounter } from '../components/counter/Context'; // Importa el contexto
import Swal from 'sweetalert2';

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const { headers, setUserAdm } = useCounter(); // Usa los headers y setUserAdm del contexto

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminData = JSON.parse(localStorage.getItem('AdminLogueado'));

        // Verifica si hay un token y datos del admin
        if (!localStorage.getItem('adminToken') || !adminData) {
          window.location.href = '/login';
          return;
        }

        // Configura el contexto con los datos del admin
        setUserAdm(adminData);
        setAdmin(adminData); // Establecer los datos del admin
      } catch (error) {
        console.error('Error fetching admin data:', error);
        Swal.fire({
          title: 'Error!',
          text: 'No se pudo cargar la información del administrador.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          window.location.href = '/login';
        });
      }
    };

    fetchAdminData();
  }, [headers, setUserAdm]);

  const handleLogout = () => {
    localStorage.removeItem('AdminLogueado');
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  };

  if (!admin) return null; // Muestra nada mientras se carga la información

  return (
    <main className="my-8">
      <div className="container mx-auto p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
          <div className="flex-1 pr-8">
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
            {admin.profileImage ? (
              <img
                src={`${import.meta.env.VITE_IMAGES_URL}${admin.profileImage}`} // Aquí se concatenan las URLs
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
