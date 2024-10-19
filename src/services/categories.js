import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`, // Agregar el token a los headers
      'Content-Type': 'application/json',
    },
  };
};

export const consultaDatos = async () => {
  const URL = `${BASE_URL}/categories`;
  try {
    const response = await axios.get(URL, getAuthHeaders()); // Usar los headers de autorización
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const consultaCategories = async () => {
  const URL = `${BASE_URL}/categories`;
  try {
    const response = await axios.get(URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Función para consultar una categoría por ID
export const consultaCategoriaPorId = async (id) => {
  const URL = `${BASE_URL}/categories/${id}`;
  try {
    const response = await axios.get(URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
};

// Función para agregar una nueva categoría
export const agregarCategoria = async (categories) => {
  const URL = `${BASE_URL}/categories`;
  try {
    const response = await axios.post(
      URL,
      {
        ...categories,
        image: categories.image[0].url, // Asegúrate de que la imagen esté en el formato correcto
      },
      getAuthHeaders(), // Incluir los headers de autorización
    );
    return response.data;
  } catch (error) {
    console.error('Error adding categories:', error);
    return null;
  }
};

// Función para editar una categoría existente
export const editarCategoria = async (id, categoria) => {
  const URL = `${BASE_URL}/categories/${id}`;
  try {
    const response = await axios.put(URL, categoria, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error editing categories:', error);
    return null;
  }
};

// Función para eliminar una categoría
export const eliminarCategoria = async (id) => {
  const URL = `${BASE_URL}/categories/${id}`;
  try {
    await axios.delete(URL, getAuthHeaders());
    return true; // Retornar true si se eliminó correctamente
  } catch (error) {
    console.error('Error deleting category:', error);
    return false; // Retornar false en caso de error
  }
};
