import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

// Función para consultar un producto por ID
export const consultaOrdenesPorUsuario = async (id, token) => {
  const URL = `${BASE_URL}/orders/user/${id}`;
  try {
    const response = await axios.get(URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching product:', error);
    return null; // Retornar null en caso de error
  }
};
