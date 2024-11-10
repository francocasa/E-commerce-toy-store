import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // Define tu URL base

// Función para obtener el token del almacenamiento local
const getAdminToken = () => localStorage.getItem('adminToken');

// Obtener datos del administrador
export const fetchAdminData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users_admin`, {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch admin data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return [];
  }
};

// Autenticar al administrador
export const authenticateAdmin = async (username, password) => {
  try {
    const data = {
      username,
      password,
    };
    const response = await axios.post(`${BASE_URL}/admins/login`, data);
    return response.data;
  } catch (error) {
    console.error('Error authenticating admin:', error);
    return null;
  }
};

// Obtener datos del administrador logueado
export const getLoggedAdmin = () => {
  const adminData = localStorage.getItem('AdminLogueado');
  try {
    return adminData ? JSON.parse(adminData) : null;
  } catch (error) {
    console.error('Error parsing admin data:', error);
    return null;
  }
};
