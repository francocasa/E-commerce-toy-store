import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

// Crear el contexto
const CounterContext = createContext();

// Crear un Provider que envuelva a los componentes
export const CounterProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userAdm, setUserAdm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    () => localStorage.getItem('AdminLogueado') !== null,
  );
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    () => localStorage.getItem('currentUserEmail') !== null,
  );

  const [adminToken, setAdminToken] = useState(
    localStorage.getItem('adminToken') || '',
  );

  // Cargar el carrito desde el localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('Cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(
        parsedCart.map((item) => ({ ...item, id: Number(item.id) })),
      );
    }
  }, []);

  // Funciones de login/logout
  const loginAdmin = (token) => {
    setAdminToken(token);
    setIsAdminLoggedIn(true);
    localStorage.setItem('AdminLogueado', 'true');
    localStorage.setItem('adminToken', token);
  };

  const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('AdminLogueado');
    setIsAdminLoggedIn(false);
    setAdminToken('');
  };

  const loginUser = () => {
    setIsUserLoggedIn(true);
    localStorage.setItem('currentUserEmail', 'true');
  };

  const logoutUser = () => {
    localStorage.removeItem('currentUserEmail');
    setIsUserLoggedIn(false);
  };

  const store = useMemo(
    () => ({
      user,
      userAdm,
      cartItems,
      isAdminLoggedIn,
      isUserLoggedIn,
      adminToken,
      setUser,
      setUserAdm,
      setCartItems,
      loginAdmin,
      logoutAdmin,
      loginUser,
      logoutUser,
    }),
    [user, userAdm, cartItems, isAdminLoggedIn, isUserLoggedIn, adminToken],
  );

  return (
    <CounterContext.Provider value={store}>{children}</CounterContext.Provider>
  );
};

// CustomHook - Consumer
export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter debe ser usado dentro de un CounterProvider');
  }
  return context;
};

// Validación de PropTypes
CounterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Exporta solo el CounterProvider
export default CounterProvider;
