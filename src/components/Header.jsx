import { Link, useLocation, useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';
import { useEffect, useState, useRef } from 'react';
import { Cart3, Person } from 'react-bootstrap-icons';
import { useCounter } from '../components/counter/Context';

const Header = () => {
  const {
    isAdminLoggedIn,
    isUserLoggedIn,
    logoutAdmin,
    logoutUser,
    cartItems,
  } = useCounter();
  const location = useLocation();
  const navigate = useNavigate();

  const navRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    if (isAdminLoggedIn) logoutAdmin();
    if (isUserLoggedIn) logoutUser();
    navigate('/');
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const menuClasses = `items-center ${!isMenuOpen ? 'hidden' : ''} justify-between w-full md:w-auto md:flex-grow md:flex md:order-1`;

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 shadow-md">
      <div className="container flex flex-wrap items-center justify-between mx-auto p-3 md:p-3 lg:p-4">
        <div className="-mb-1 lg:w-72">
          <Link to={isAdminLoggedIn ? '/admin/dashboard' : '/'}>
            <img src="/Logo.png" alt="Juguetitos" className="w-36" />
          </Link>
        </div>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        <div className={menuClasses} ref={navRef}>
          {isAdminLoggedIn ? (
            <div className="ml-20">
              <ul className="flex flex-col md:flex-row gap-2 lg:gap-32 p-2 md:p-0 mt-2 mb-3 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                <li>
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 transition-colors"
                    >
                      Modificar
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <ul className="flex flex-col">
                          <li>
                            <Link
                              to="/admin/dashboard/categories"
                              className="block py-2 px-3 text-gray-900 hover:bg-blue-100 transition-colors"
                            >
                              Categoría
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/admin/dashboard/descuento"
                              className="block py-2 px-3 text-gray-900 hover:bg-blue-100 transition-colors"
                            >
                              Descuentos
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/admin/dashboard/marca"
                              className="block py-2 px-3 text-gray-900 hover:bg-blue-100 transition-colors"
                            >
                              Marca
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/admin/dashboard/material"
                              className="block py-2 px-3 text-gray-900 hover:bg-blue-100 transition-colors"
                            >
                              Material
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/admin/dashboard/products"
                              className="block py-2 px-3 text-gray-900 hover:bg-blue-100 transition-colors"
                            >
                              Productos
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
                <li></li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <ul className="flex flex-col p-2 md:p-0 mt-2 mb-3 font-medium text-sm border border-gray-100 rounded-lg bg-gray-50 md:space-x-0 mx-auto rtl:space-x-reverse md:flex-row md:my-0 md:border-0 md:bg-white lg:text-base">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 transition-colors"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/promotions"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 transition-colors"
                >
                  Promociones
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 transition-colors"
                >
                  Categorías
                </Link>
              </li>
            </ul>
          )}

          {/* Mostrar Searchbar y iconos solo si el administrador no está logueado */}
          {!isAdminLoggedIn && (
            <div className="flex justify-between items-center md:w-60 lg:w-72 gap-2 w-full">
              <div className="flex-grow">
                <Searchbar />
              </div>
              <Link to={isUserLoggedIn ? '/perfil' : '/login'}>
                <Person
                  color="black"
                  className="cursor-pointer text-2xl lg:text-[30px]"
                />
              </Link>
              <Link to="/cart" className="relative">
                <Cart3
                  color="black"
                  className="cursor-pointer text-xl lg:text-[26px]"
                />
                {cartItems && cartItems.length > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 aspect-square flex justify-center items-center">
                    <span className="mt-1">{cartItems.length}</span>
                  </div>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
