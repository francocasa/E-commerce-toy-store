import { useState } from 'react';
import Swal from 'sweetalert2';
import { authenticateAdmin } from '../services/admins'; // Importar desde el servicio
import { useCounter } from '../components/counter/Context';

function LoginAdmPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserAdm } = useCounter(); // Cambiado para usar el contexto

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseData = await authenticateAdmin(username, password);
      console.log(responseData);

      if (responseData && responseData.admin) {
        const admin = responseData.admin;
        const tokenId = responseData.token;

        localStorage.setItem('adminToken', tokenId);
        localStorage.setItem('AdminLogueado', JSON.stringify(admin));

        // Guardar el administrador en el contexto
        setUserAdm(admin);

        Swal.fire({
          title: 'Éxito!',
          text: 'Has iniciado sesión como administrador.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          window.location.reload(); // Refrescar la página
          window.location.href = '/admin/dashboard';
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Credenciales incorrectas. Por favor, intenta de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      console.error('Error de autenticación:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Hubo un problema con la autenticación.',
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
          type="text"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
