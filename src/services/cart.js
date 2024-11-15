import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

export const obtenerCarritoPorUsuario = async (id) => {
  const URL = `${BASE_URL}/carts/user/${id}`; // Construir la URL para las categorías
  try {
    const response = await axios.get(URL);
    return response.data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching product:', error);
    return null; // Retornar null en caso de error
  }
};

// Función para editar un producto existente
export const updateCartItemDB = async (item, quantity, token) => {
  const URL = `${BASE_URL}/carts/item/${item.idItemCart}`;
  const datos = { quantity: quantity };

  try {
    const response = await axios.patch(URL, datos, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error editing product:', error.response.data); // Imprime el error detallado
    return null;
  }
};

// Función para agregar un nuevo producto
export const addCartItemDB = async (cartId, item, token) => {
  const URL = `${BASE_URL}/carts/${cartId}/item`;
  console.log('URL');
  console.log(URL);
  console.log('item.id');
  console.log(item.id);
  const datos = { productId: item.id, quantity: item.quantity };
  console.log('datos');
  console.log(datos);

  try {
    const response = await axios.post(URL, datos, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Agregar el token
      },
    });
    return response.data; // Retornar el producto agregado
  } catch (error) {
    console.error('Error adding product:', error);
    return null; // Retornar null en caso de error
  }
};

// Función para eliminar un producto existente
export const deleteCartItemDB = async (item, token) => {
  const URL = `${BASE_URL}/carts/item/${item.idItemCart}`;
  try {
    const response = await axios.delete(URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error editing product:', error.response.data); // Imprime el error detallado
    return null;
  }
};

// Función para pagar
export const payment = async (id, token) => {
  const URL = `${BASE_URL}/payment/${id}`;

  try {
    const response = await axios.post(URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Agregar el token
      },
    });
    return response.data; // Retornar el pago
  } catch (error) {
    console.error('Error adding product:', error);
    return null; // Retornar null en caso de error
  }
};
