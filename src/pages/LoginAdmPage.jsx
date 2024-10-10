import { useState } from 'react';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { authenticateAdmin } from '../services/usersadmin';

function LoginAdmPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showToast = (title, text, type) => {
    Toastify({
      text: `${title}: ${text}`,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      backgroundColor: type === 'success' ? '#4CAF50' : '#FF9800',
      stopOnFocus: true,
      offset: {
        x: 20,
        y: 60,
      },
    }).showToast();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const admin = await authenticateAdmin(email, password);

      if (admin) {
        showToast(
          'Éxito!',
          `Bienvenido, ${admin.fullName}. Has iniciado sesión como administrador.`,
          'success',
        );
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 3000); // Espera antes de redirigir
      } else {
        showToast(
          'Error!',
          'Credenciales incorrectas. Por favor, intenta de nuevo.',
          'error',
        );
      }
    } catch (error) {
      showToast(
        'Error!',
        'Hubo un problema al autenticarte. Intenta nuevamente.',
        'error',
      );
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
