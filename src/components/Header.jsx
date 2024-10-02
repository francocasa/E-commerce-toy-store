import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';
import { useEffect, useState, useRef } from 'react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPage = location.pathname.includes('/admin');
  const isLoggedIn = localStorage.getItem('currentUserEmail') !== null;

  const handleLogout = () => {
    localStorage.removeItem('AdminLogueado');
    navigate('/');
  };

  const navRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú de hamburguesa

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alternar estado del menú
  };

  useEffect(() => {
    // Cerrar menú al cambiar de página
    setIsMenuOpen(false);
  }, [location]);

  // Ocultar la nav si se hace click fuera de ella
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        event.target.name !== 'menu-button'
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3 md:p-4">
        <div className="-mb-1">
          <Link to="/">
            <img src="/Logo.png" alt="Juguetitos" className="w-36" />
          </Link>
        </div>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            name="menu-button"
          >
            ☰
          </button>
        </div>
        <div
          className={`items-center ${!isMenuOpen && `hidden`} justify-between flex-grow md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
          ref={navRef}
        >
          {!isAdminPage ? (
            <ul className="flex flex-col p-2 md:p-0 mt-2 mb-3 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 "
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 "
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/promotions"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 "
                >
                  Promociones
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 "
                >
                  Categorías
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col p-2 md:p-0 mt-2 mb-3 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  to="/admin/dashboard/products"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100"
                >
                  Modificar Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dashboard/reportes"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100"
                >
                  Reporte Ventas
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100"
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          )}

          <div className="flex justify-between items-center">
            {!isAdminPage && <Searchbar />}
            {!isAdminPage && (
              <>
                <Link to={isLoggedIn ? '/perfil' : '/login'}>
                  <img
                    src="/icon.svg"
                    alt="Usuario"
                    className="h-8 cursor-pointer"
                  />
                </Link>
                <Link to="/cart">
                  <img
                    src="/cart.png"
                    alt="Carrito"
                    className="h-8 cursor-pointer"
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
