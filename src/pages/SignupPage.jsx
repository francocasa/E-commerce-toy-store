import { useState } from 'react';
import { createUser, getUserIdByEmail } from '../services/userprofile';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(checkPasswordStrength(value));
  };

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

    if (localStorage.getItem('currentUserEmail')) {
      showToast('Error!', 'Cerrar sesión del usuario actual.', 'error');
      return;
    }

    const existingUserId = await getUserIdByEmail(email);
    if (existingUserId) {
      showToast('Error!', 'Este correo ya está registrado.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Error!', 'Las contraseñas no coinciden.', 'error');
      return;
    }

    if (passwordStrength < 4) {
      showToast(
        'Error!',
        'La contraseña debe cumplir con los siguientes requisitos:\n1. Mayor a 8 caracteres\n2. Contener minúsculas y mayúsculas\n3. Contener un número\n4. Contener un carácter especial (@!?¡&gt;)',
        'error',
      );
      return;
    }

    const newUser = {
      email,
      password,
      fullName: '', // Si necesitas este campo
      photo: '', // Si necesitas este campo
    };

    try {
      await createUser(newUser);
      showToast('Éxito!', 'Usuario creado correctamente.', 'success');
      navigate('/perfil'); // Redirige al perfil o a otra página
    } catch (error) {
      showToast(
        'Error!',
        'No se pudo crear el usuario. Intenta de nuevo más tarde.',
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
        <h1 className="text-2xl font-bold mb-4">Registrarse</h1>
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
          onChange={handlePasswordChange}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="password"
          placeholder="Repite la Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />

        <div className="w-full bg-gray-200 h-2 rounded mb-4">
          <div
            className={`h-2 rounded ${passwordStrength === 0 ? 'bg-gray-400' : passwordStrength === 1 ? 'bg-red-500' : passwordStrength === 2 ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${(passwordStrength / 4) * 100}%` }}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
          disabled={passwordStrength < 4 || password !== confirmPassword}
        >
          Registrarse
        </button>

        <div className="mt-4 text-sm">
          <p>Para crear el usuario:</p>
          <ul className="list-disc list-inside">
            <li>1. Debe ser mayor a 8 caracteres</li>
            <li>2. Debe contener minúsculas y mayúsculas</li>
            <li>3. Debe contener un número</li>
            <li>4. Debe contener un carácter especial (@!?¡&gt;)</li>
          </ul>
        </div>
      </form>
    </main>
  );
}

export default SignupPage;
