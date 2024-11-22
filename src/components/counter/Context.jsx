import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { consultaProductos } from '../../services/products'; // Importa el servicio
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import {
  addCartItemDB,
  updateCartItemDB,
  deleteCartItemDB,
  obtenerCarritoPorUsuario,
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
  const [verifiedCart, setVerifiedCart] = useState(false);
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
    setVerifiedCart(false);
    if (storedCart) {
      let parsedCart = JSON.parse(storedCart);
      parsedCart.map((item) => delete item.idItemCart);
      setCartItems(parsedCart.map((item) => ({ ...item, id: item.id })));
    }
    if (localStorage.getItem('currentUserEmail')) {
      localStorage.removeItem('currentUserEmail');
    }
    if (localStorage.getItem('currentUserId')) {
      localStorage.removeItem('currentUserId');
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
      const products = await consultaProductos(); // Usa el servicio
      // agregar de localstorage
      userCart.items.map((userCartItem) => {
        const existingProduct = cartItems.find(
          (cartItem) => cartItem.id === userCartItem.productId,
        );
        // en caso exista el producto del carro de la base de datos en el localstorage, mantiene la cantidad del localstorage
        if (existingProduct) {
          existingProduct.idItemCart = userCartItem.id;
          updateCartItem(existingProduct, existingProduct.quantity);
          // en caso NO exista producto de la base de datos en el carrito del localstorage
        } else {
          const existingProductDB = products.find(
            (product) => product.id === userCartItem.productId,
          );
          // en caso existe en la base de datos de productos, se agrega al local
          if (existingProductDB) {
            let finalPrice = existingProductDB.price;
            let discount = 0;
            if (existingProductDB.discountId) {
              discount = (
                existingProductDB.price * existingProductDB.discount.discount
              ).toFixed(2);
              finalPrice = (
                existingProductDB.price *
                (1 - existingProductDB.discount.discount)
              ).toFixed(2);
            }
            const imageUrl =
              Array.isArray(existingProductDB.images) &&
              existingProductDB.images.length > 0
                ? existingProductDB.images[0].url
                : '';
            const cartItem = {
              id: existingProductDB.id, // Se mantiene como string
              title: existingProductDB.name, // Cambiado de title a name
              price: existingProductDB.price,
              finalPrice: parseFloat(finalPrice),
              discount: discount,
              image: imageUrl, // Asegúrate de obtener la URL de la imagen
              quantity: userCartItem.quantity,
              categoryId: existingProductDB.categoryId, // Añadir categoryId aquí
              idItemCart: userCartItem.id,
            };

            addCartItem(cartItem);
          }
        }
      }); //item no existente en db

      cartItems.map((item) => {
        const existingProduct = userCart.items.find(
          (userCartItem) => item.id === userCartItem.productId,
        );
        if (existingProduct === undefined) {
          addCartItem(item, false);
        }
      });
    } catch (error) {
      console.error('Error en loadCartItems:', error);
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

  const updateCartItem = async (item, quantity) => {
    console.log(item);
    try {
      const storedCart = JSON.parse(localStorage.getItem('Cart'));
      const updatedCart = storedCart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            quantity: Math.max(1, quantity),
            idItemCart: item.idItemCart,
          };
        }
        return cartItem;
      });
      if (user.id !== undefined) {
        let response = await updateCartItemDB(item, quantity, token);
      }
      updateLocalCart(updatedCart);
    } catch (error) {
      console.error('Error al actualizar un item:', error);
      Swal.fire(
        'Error',
        error.response?.data?.details[0]?.message ||
          'Ocurrió un error inesperado.',
        'error',
      );
    }
  };

  const deleteCartItem = async (item) => {
    try {
      let response;
      const updatedCart = cartItems.filter(
        (cartItem) => cartItem.id !== item.id,
      );
      if (user.id !== undefined) {
        response = await deleteCartItemDB(item, token);
      }
      updateLocalCart(updatedCart);
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

  const addCartItem = async (item, nuevo = true) => {
    try {
      let response;
      if (user.id !== undefined) {
        response = await addCartItemDB(userCart.id, item, token);
        item.idItemCart = response.id;
      }
      if (nuevo) {
        const storedCart = localStorage.getItem('Cart');
        let arrayCartItems = [...cartItems, item];
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          arrayCartItems = [...parsedCart, item];
        }
        setCartItems(arrayCartItems);
        localStorage.setItem('Cart', JSON.stringify(arrayCartItems));
      } else {
        const storedCart = JSON.parse(localStorage.getItem('Cart'));
        const updatedCart = storedCart.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...cartItem, idItemCart: item.idItemCart };
          }
          return cartItem;
        });
        setCartItems(updatedCart);
        localStorage.setItem('Cart', JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error('Error al agregar un item:', error);
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
      verifiedCart,
      setUser,
      setUserAdm,
      setCartItems,
      loginAdmin,
      logoutAdmin,
      loginUser,
      logoutUser,
      setToken,
      updateCartItem,
      deleteCartItem,
      addCartItem,
      updateLocalCart,
      setUserCart,
      loadCartItems,
      setIsUserLoggedIn,
      setVerifiedCart,
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
