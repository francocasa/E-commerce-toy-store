import Searchbar from './Searchbar';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-5 bg-white shadow-md">
      <img src="/Logo.png" alt="Juguettos" className="w-36" />
      <Searchbar />
      <div className="flex items-center space-x-4">
        <img src="/icon.svg" alt="Usuario" className="w-8 h-8 cursor-pointer" />
        <img src="/cart.png" alt="Carrito" className="w-8 h-8 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
