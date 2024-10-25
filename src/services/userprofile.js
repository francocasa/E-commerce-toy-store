import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

// Obtener el perfil del usuario
export const getUserProfile = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Actualizar el perfil del usuario
export const updateUserProfile = async (updatedUser, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    await axios.put(`${BASE_URL}/users/${updatedUser.id}`, updatedUser, {
      headers,
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
};

// Autenticar al usuario
export const authenticateUser = async (email, password) => {
  try {
    const data = {
      email: email,
      password: password,
    };
    const response = await axios.post(`${BASE_URL}/users/login`, data);
    console.log(response.data);
    return response.data;
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
    // Generar un nuevo ID (asegúrate de que sea único)
    const newUser = {
      id: generateUniqueId(), // Implementa tu propia lógica para generar un ID único
      ...user, // Spread operator para incluir el resto de las propiedades
    };

    const response = await axios.post(`${BASE_URL}/users`, newUser);
    return response.data; // Devuelve el usuario creado
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Obtener el historial del usuario
export const getHistory = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data.orders || []; // Retorna las órdenes (historial) del usuario
  } catch (error) {
    console.error('Error fetching user history:', error);
    return null;
  }
};

// Función para generar un ID único (puedes modificar esto según tus necesidades)
const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9); // Genera un ID aleatorio
};

// Obtener el historial del usuario
export const postPayment = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/${id}`);
    return response.data.orders || []; // Retorna las órdenes (historial) del usuario
  } catch (error) {
    console.error('Error fetching user history:', error);
    return null;
  }
};
