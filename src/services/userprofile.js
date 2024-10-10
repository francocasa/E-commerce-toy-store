import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

// Obtener el perfil del usuario y su historial
// Función para consultar los items de una orden por ID
export const getUserProfile = async (id) => {
  try {
    const userResponse = await axios.get(`${BASE_URL}/users/${id}`);
    const user = userResponse.data;

    // Obtener las órdenes del usuario
    const ordersResponse = await axios.get(`${BASE_URL}/orders?userId=${id}`);
    const orders = ordersResponse.data;

    // Devolver el usuario junto con sus órdenes
    return { ...user, orders };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Actualizar el perfil del usuario
export const updateUserProfile = async (updatedUser) => {
  try {
    await axios.put(`${BASE_URL}/users/${updatedUser.id}`, updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
};

// Autenticar al usuario
export const authenticateUser = async (email, password) => {
  try {
    const response = await axios.get(`${BASE_URL}/users?email=${email}`);
    const users = response.data;
    const user = users.find((user) => user.passwordHash === password); // Cambiado a passwordHash
    return user ? user.id : null; // Devuelve el ID si se autentica
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};

export const getUserIdByEmail = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/users?email=${email}`);
    const users = response.data;
    return users.length > 0 ? users[0].id : null; // Devuelve el ID si se encuentra
  } catch (error) {
    console.error('Error fetching user ID by email:', error);
    return null;
  }
};

export const createUser = async (user) => {
  try {
    const newUser = {
      id: generateUniqueId(), // Implementa tu propia lógica para generar un ID único
      passwordHash: user.passwordHash, // Asegúrate de usar el hash de la contraseña
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDeleted: false,
      ...user, // Spread operator para incluir el resto de las propiedades
    };

    const response = await axios.post(`${BASE_URL}/users`, newUser);
    return response.data; // Devuelve el usuario creado
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función para generar un ID único
const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9); // Genera un ID aleatorio
};
