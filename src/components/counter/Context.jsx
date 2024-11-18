import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { consultaProductos } from '../../services/products'; // Importa el servicio
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import {
  addCartItemDB,
  updateCartItemDB,
  deleteCartItemDB,
  obtenerCarritoPorUsuario,
  getCartByUser,
  addCartItem as addCartItemService,
} from '../../services/cart';
const IMAGES_URL = import.meta.env.VITE_IMAGES_URL; // Obtener la URL base desde el .env

// Crear el contexto
const CounterContext = createContext();

// Crear un Provider que envuelva a los componentes
export const CounterProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userCart, setUserCart] = useState({});
  const [userAdm, setUserAdm] = useState('');
  const [token, setToken] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    () => localStorage.getItem('AdminLogueado') !== null,
  );
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    () => user.id !== undefined,
  );

  const [adminToken, setAdminToken] = useState(
    localStorage.getItem('adminToken') || '',
  );

  // Cargar el carrito desde el localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('Cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
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

  const loginUser = (email, id) => {
    const user = { email, id };
    setUser(user);
    setIsUserLoggedIn(true);
    localStorage.setItem('currentUserEmail', email);
    localStorage.setItem('currentUserId', id); // Asegúrate de guardar el ID también
  };

  const loadCartItems = async () => {
    try {
      const response = await getCartByUser(user.id, token);

      console.log('response', response);
      // Save the cart in the localStorage
      localStorage.setItem('cart_data', JSON.stringify(response.items));

      setUserCart(response);
      setCartItems(response.items);
    } catch (error) {
      console.error('Error al obtener id de carrito:', error);
      Swal.fire(
        'Error',
        error.response?.data?.details[0]?.message ||
          'Ocurrió un error inesperado.',
        'error',
      );
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('currentUserEmail');
    setIsUserLoggedIn(false);
  };

  const addCartItem = async (productId, quantity) => {
    try {
      const response = await addCartItemService(
        userCart.id,
        productId,
        quantity,
        token,
      );

      // Save the cart in the localStorage
      localStorage.setItem('cart_data', JSON.stringify(response.items));

      setCartItems(response.items);
    } catch (error) {
      console.error('Error al añadir un item:', error);
      Swal.fire(
        'Error',
        error.response?.data?.details[0]?.message ||
          'Ocurrió un error inesperado.',
        'error',
      );
    }
  };

  const deleteCartItem = async (itemId) => {
    try {
      const response = await deleteCartItem(item, token);

      // Save the cart in the localStorage
      localStorage.setItem('cart_data', JSON.stringify(response.items));

      setCartItems(response.items);
    } catch (error) {
      console.error('Error al eliminar un item:', error);
      Swal.fire(
        'Error',
        error.response?.data?.details[0]?.message ||
          'Ocurrió un error inesperado.',
        'error',
      );
    }
  };

  const updateLocalCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('Cart', JSON.stringify(updatedCart));
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
      setToken,
      deleteCartItem,
      addCartItem,
      updateLocalCart,
      setUserCart,
      loadCartItems,
      setIsUserLoggedIn,
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
