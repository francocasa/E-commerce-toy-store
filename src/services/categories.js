import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

export const consultaDatos = async () => {
  const URL = `${BASE_URL}/categories`; // Construir la URL para las categorías
  console.log(URL);
  try {
    const response = await axios.get(URL); // Usar Axios para realizar la solicitud
    return response.data; // Axios ya convierte la respuesta a JSON
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};
