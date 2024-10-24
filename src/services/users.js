import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const getUserProfile = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (updatedUser, headers) => {
  try {
    await axios.put(`${BASE_URL}/users/${updatedUser.id}`, updatedUser, {
      headers,
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const updateUserImage = async (id, data, headers) => {
  try {
    const response = await axios.patch(`${BASE_URL}/users/${id}/image`, data, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.profileImage;
  } catch (error) {
    console.error('Error updating user profile image:', error);
    throw error;
  }
};

// Autenticar al usuario
export const authenticateUser = async (email, password) => {
  try {
    const data = { email, password };
    const response = await axios.post(`${BASE_URL}/users/login`, data);
    return response.data;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
};

// Obtener el ID del usuario por email
export const getUserIdByEmail = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/users?email=${email}`);
    const users = response.data;
    return users.length > 0 ? users[0].id : null;
  } catch (error) {
    console.error('Error fetching user ID by email:', error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (user) => {
  try {
    const newUser = { id: generateUniqueId(), ...user };
    const response = await axios.post(`${BASE_URL}/users`, newUser);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Función para generar un ID único
const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};
