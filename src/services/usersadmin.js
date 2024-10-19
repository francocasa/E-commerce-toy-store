import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL; // Define tu URL base

export const fetchAdminData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users_admin`);
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
      username: username, // Cambiado de email a username
      password: password,
    };
    const response = await axios.post(`${BASE_URL}/admins/login`, data); // Cambiado a /admin/login
    console.log(response.data);
    return response.data; // Asumiendo que la respuesta contiene información de autenticación
  } catch (error) {
    console.error('Error authenticating admin:', error);
    return null;
  }
};

export const getLoggedAdmin = () => {
  const adminData = localStorage.getItem('AdminLogueado');
  try {
    return adminData ? JSON.parse(adminData) : null;
  } catch (error) {
    console.error('Error parsing admin data:', error);
    return null;
  }
};
