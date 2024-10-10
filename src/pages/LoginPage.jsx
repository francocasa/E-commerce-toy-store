import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { authenticateUser, getUserProfile } from '../services/userprofile';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

    // Comprobar si el usuario ya está registrado
    if (localStorage.getItem('currentUserEmail')) {
      showToast(
        'Usuario logueado con éxito!',
        'No se puede crear una nueva cuenta mientras estés conectado.',
        'info',
      );
      return;
    }

    // Lógica de autenticación
    const userId = await authenticateUser(email, password);

    if (userId) {
      const user = await getUserProfile(userId); // Obtener el perfil del usuario
      if (user) {
        localStorage.setItem('currentUserId', user.id); // Guarda el ID
        localStorage.setItem('currentUserEmail', email);
        showToast('Éxito!', 'Inicio de sesión aceptado.', 'success');
        setTimeout(() => {
          navigate('/perfil');
        }, 3000); // Espera antes de redirigir
      } else {
        showToast(
          'Error!',
          'No se pudo obtener el perfil del usuario.',
          'error',
        );
      }
    } else {
      showToast('Error!', 'Usuario o contraseña incorrectos.', 'error');
    }
  };

  return (
    <main className="container mx-auto p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
        >
          Entrar
        </button>
        <p className="text-center mt-4">
          No tienes una cuenta?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Regístrate
          </Link>
        </p>
        <Link
          to="/loginAdm"
          className="text-blue-500 text-center block mt-4 hover:underline"
        >
          Inicio de sesión ADMINISTRADOR
        </Link>
      </form>
    </main>
  );
}

export default LoginPage;
