import { useState } from 'react';
import Swal from 'sweetalert2';
import { authenticateAdmin } from '../data/DbUsers'; // Asegúrate de importar la función

function LoginAdmPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lógica de autenticación para el administrador
    if (authenticateAdmin(email, password)) {
      Swal.fire({
        title: 'Éxito!',
        text: 'Has iniciado sesión como administrador.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        // Redirigir a la página del administrador o donde desees
        window.location.href = '/admin/dashboard'; // Cambia esta ruta según tu estructura
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
        <h1 className="text-2xl font-bold mb-4">
          Iniciar Sesión Administrador
        </h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default LoginAdmPage;
