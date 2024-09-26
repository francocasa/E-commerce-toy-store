import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-5 bg-white shadow-md mx-4">
      <Link to="/">
        <img src="/Logo.png" alt="Juguetitos" className="w-36" />
      </Link>

      <Searchbar />

      <div className="flex items-center space-x-4">
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
