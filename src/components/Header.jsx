import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-5 bg-white shadow-md mx-4">
      <div className="w-80">
        <Link to="/">
          <img src="/Logo.png" alt="Juguetitos" className="w-36" />
        </Link>
      </div>

      <nav className="mr-3">
        <ul className="flex items-center space-x-4">
          <li>
            <Link to="/" className="text-gray-800 hover:text-gray-600">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/products" className="text-gray-800 hover:text-gray-600">
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
              Categorias
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex items-center space-x-4 w-80">
        <Searchbar />

        <Link to="/login">
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
    </header>
  );
};

export default Header;
