import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticación
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-8">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto">
          <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Entrar</button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default LoginPage;
