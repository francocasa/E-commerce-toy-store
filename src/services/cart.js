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
