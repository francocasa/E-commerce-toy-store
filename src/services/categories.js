import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

export const consultaDatos = async () => {
  const URL = `${BASE_URL}/categories`; // Construir la URL para las categorías
  try {
    const response = await axios.get(URL); // Usar Axios para realizar la solicitud
    return response.data; // Axios ya convierte la respuesta a JSON
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

export const consultaCategories = async () => {
  const URL = `${BASE_URL}/categories`; // Construir la URL para las categorías
  try {
    const response = await axios.get(URL); // Usar Axios para realizar la solicitud
    return response.data; // Axios ya convierte la respuesta a JSON
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para consultar un categoria por ID
export const consultaCategoriaPorId = async (id) => {
  const URL = `${BASE_URL}/categories/${id}`;
  try {
    const response = await axios.get(URL);
    return response.data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching category:', error);
    return null; // Retornar null en caso de error
  }
};

// Función para agregar una nueva categoria
export const agregarCategoria = async (categories) => {
  const URL = `${BASE_URL}/categories`;
  try {
    const response = await axios.post(
      URL,
      {
        ...categories,
        image: categories.image[0].url, // Asegúrate de que la imagen esté en el formato correcto
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data; // Retornar la categoria agregado
  } catch (error) {
    console.error('Error adding categories:', error);
    return null; // Retornar null en caso de error
  }
};

// Función para editar un categoria existente
export const editarCategoria = async (id, categoria) => {
  const URL = `${BASE_URL}/categories/${id}`;
  try {
    const response = await axios.put(URL, categoria, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Retornar el categoria editado
  } catch (error) {
    console.error('Error editing categories:', error);
    return null; // Retornar null en caso de error
  }
};

// Función para eliminar un categoria
export const eliminarCategoria = async (id) => {
  const URL = `${BASE_URL}/categories/${id}`;
  try {
    await axios.delete(URL);
    return true; // Retornar true si se eliminó correctamente
  } catch (error) {
    console.error('Error deleting category:', error);
    return false; // Retornar false en caso de error
  }
};
