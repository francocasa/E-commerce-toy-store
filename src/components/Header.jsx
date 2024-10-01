import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPage = location.pathname.includes('/admin');
  const isLoggedIn = localStorage.getItem('currentUserEmail') !== null;

  const handleLogout = () => {
    localStorage.removeItem('AdminLogueado');
    navigate('/');
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú de hamburguesa

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alternar estado del menú
  };

  return (
    <header className="flex flex-col items-center p-5 bg-white shadow-md mx-4">
      {/* Logo en pantallas pequeñas */}
      <div className="w-80 mb-2 sm:hidden">
        <Link to="/">
          <img src="/Logo.png" alt="Juguetitos" className="w-36" />
        </Link>
      </div>

      {/* Icono de hamburguesa en el centro (solo en pantallas pequeñas) */}
      <button onClick={toggleMenu} className="block sm:hidden mb-2">
        <span className="block">☰</span>{' '}
        {/* Cambia a un ícono de menú de tu elección */}
      </button>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <nav className="w-full mb-2">
          <ul className="flex flex-col items-center space-y-2">
            {!isAdminPage ? (
              <>
                <li>
                  <Link to="/" className="text-gray-800 hover:text-gray-600">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-gray-800 hover:text-gray-600"
                  >
                    Productos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/promotions"
                    className="text-gray-800 hover:text-gray-600"
                  >
                    Promociones
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="text-gray-800 hover:text-gray-600"
                  >
                    Categorías
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/admin/dashboard/products"
                    className="text-gray-800 hover:text-gray-600"
                  >
                    Modificar Productos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/dashboard/reportes"
                    className="text-gray-800 hover:text-gray-600"
                  >
                    Reporte Ventas
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-gray-800 hover:text-gray-600"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}

      {/* Searchbar y sección de íconos centrados (pantallas pequeñas) */}
      <div className="flex flex-col items-center w-full mt-2 sm:hidden">
        <Searchbar />
        <div className="flex space-x-4 mt-2">
          <Link to={isLoggedIn ? '/perfil' : '/login'}>
            <img
              src="/icon.svg"
              alt="Usuario"
              className="w-8 h-8 cursor-pointer"
            />
          </Link>
          <Link to="/cart">
            <img
              src="/cart.png"
              alt="Carrito"
              className="w-8 h-8 cursor-pointer"
            />
          </Link>
        </div>
      </div>

      {/* Estructura para pantallas grandes */}
      <div className="hidden sm:flex justify-between items-center w-full">
        {/* Logo en pantallas grandes */}
        <div className="w-80">
          <Link to="/">
            <img src="/Logo.png" alt="Juguetitos" className="w-36" />
          </Link>
        </div>

        {/* Barra de navegación centrada */}
        <nav className="flex-grow">
          <ul className="flex justify-center space-x-4">
            {!isAdminPage ? (
              <>
                <li>
                  <Link to="/" className="text-gray-800 hover:text-gray-600">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-gray-800 hover:text-gray-600"
                  >
                    Productos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/promotions"
                    className="text-gray-800 hover:text-gray-600"
                  >
                    Promociones
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="text-gray-800 hover:text-gray-600"
                  >
                    Categorías
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/admin/dashboard/products"
                    className="text-gray-800 hover:text-gray-600"
                  >
                    Modificar Productos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/dashboard/reportes"
                    className="text-gray-800 hover:text-gray-600"
                  >
                    Reporte Ventas
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-gray-800 hover:text-gray-600"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Sección de búsqueda e íconos a la derecha */}
        <div className="flex items-center space-x-4 w-80">
          {!isAdminPage && <Searchbar />}
          {!isAdminPage && (
            <>
              <Link to={isLoggedIn ? '/perfil' : '/login'}>
                <img
                  src="/icon.svg"
                  alt="Usuario"
                  className="w-8 h-8 cursor-pointer"
                />
              </Link>
              <Link to="/cart">
                <img
                  src="/cart.png"
                  alt="Carrito"
                  className="w-8 h-8 cursor-pointer"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
