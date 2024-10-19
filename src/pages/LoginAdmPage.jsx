import { useState } from 'react';
import Swal from 'sweetalert2';
import { authenticateAdmin } from '../services/usersadmin'; // Importar desde el servicio
import { useNavigate } from 'react-router-dom';
import { useCounter } from '../components/counter/Context';

function LoginAdmPage() {
  const [username, setUsername] = useState(''); // Cambiado a username
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setuserAdm } = useCounter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lógica de autenticación para el administrador
    const responseData = await authenticateAdmin(username, password);
    console.log(responseData);
    if (responseData && responseData.admin) {
      const admin = responseData.admin;
      const tokenId = responseData.token;

      // Guardar el token en el localStorage
      localStorage.setItem('adminToken', tokenId);

      // Guardar el ID del admin en el localStorage
      localStorage.setItem('AdminLogueado', JSON.stringify(admin)); // Guarda el objeto completo si es necesario

      // Si estás usando un contexto para el usuario admin
      setuserAdm(admin);

      Swal.fire({
        title: 'Éxito!',
        text: 'Has iniciado sesión como administrador.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        navigate('/admin/dashboard'); // Cambia esta ruta según tu estructura
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Credenciales incorrectas. Por favor, intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <main className="container mx-auto p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          Iniciar Sesión Administrador
        </h1>
        <input
          type="text" // Cambiado a text para username
          placeholder="Nombre de Usuario"
          value={username} // Cambiado a username
          onChange={(e) => setUsername(e.target.value)} // Cambiado a setUsername
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default LoginAdmPage;
