import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// 1. Crear el contexto
const CounterContext = createContext();

// 2. Crear un Provider que envuelva a los componentes
export const CounterProvider = ({ children }) => {
  // Estado para el contador y el valor de incremento/decremento

  const [user, setUser] = useState({});
  const [userAdm, setuserAdm] = useState('');
  const [token, setToken] = useState('');
  const [headers, setHeaders] = useState({});
  const [cartItems, setCartItems] = useState([]);

  // cart
  useEffect(() => {
    const storedCart = localStorage.getItem('Cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      const updatedCart = parsedCart.map((item) => ({
        ...item,
        id: Number(item.id), // Asegúrate de que id sea un número
      }));
      setCartItems(updatedCart);
    }
  }, []);
  // 4. Valor del contexto
  const store = {
    user,
    userAdm,
    cartItems,
    token,
    headers,
    setUser,
    setuserAdm,
    setCartItems,
    setToken,
    setHeaders,
  };

  // 3. Utilizar el Contexto para crear el provider
  return (
    <CounterContext.Provider value={store}>{children}</CounterContext.Provider>
  );
};

// CustomHook - Consumer
export const useCounter = () => {
  const context = useContext(CounterContext);

  return context;
};

// Validación de PropTypes
CounterProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};
