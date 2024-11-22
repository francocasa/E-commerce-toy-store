import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authenticateUser } from '../services/users';
import { obtenerCarritoPorUsuario } from '../services/cart';
import { useCounter } from '../components/counter/Context';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser, setToken, setIsUserLoggedIn, setUserCart, loginUser } =
    useCounter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseData = await authenticateUser(email, password);
    const user = responseData.user;
    if (user) {
      const carritoPorUsuario = await obtenerCarritoPorUsuario(user.id);
      loginUser(user, responseData.token, carritoPorUsuario);
      Swal.fire({
        title: 'Éxito!',
        text: 'Inicio de sesión aceptado.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        navigate('/perfil');
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Usuario o contraseña incorrectos.',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
      });
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
