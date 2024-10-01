import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPage = location.pathname.includes('/admin');
  const isLoggedIn = localStorage.getItem('currentUserEmail') !== null;

  const handleLogout = () => {
    localStorage.removeItem('AdminLogueado');
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center p-5 bg-white shadow-md mx-4">
      <div className="w-80">
        <Link to="/">
          <img src="/Logo.png" alt="Juguetitos" className="w-36" />
        </Link>
      </div>

      {!isAdminPage ? (
        <nav className="mr-3">
          <ul className="flex items-center space-x-4">
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
          </ul>
        </nav>
      ) : (
        <nav className="mr-3">
          <ul className="flex items-center gap-20">
            {' '}
            {/* Aumenta el espacio aquí */}
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
          </ul>
        </nav>
      )}

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
    </header>
  );
};

export default Header;
