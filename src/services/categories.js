import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

// En tu archivo categories.js

// Función para obtener datos de categorías (por ejemplo)
export const consultaDatos = async () => {
  const URL = `${BASE_URL}/categories`;
  try {
    const response = await axios.get(URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching data:',
      error.response?.data || error.message,
    );
    return [];
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`, // Agregar el token a los headers
      'Content-Type': 'application/json',
    },
  };
};

// Función para consultar todas las categorías
export const consultaCategories = async () => {
  const URL = `${BASE_URL}/categories`; // Endpoint para obtener todas las categorías
  try {
    const response = await axios.get(URL, getAuthHeaders()); // Obtener todas las categorías, sin filtrar en el backend
    // Filtrar categorías activas (isDeleted: false)
    const activeCategories = response.data.filter(
      (category) => !category.isDeleted,
    );
    return activeCategories; // Retornar solo las categorías activas
  } catch (error) {
    console.error('Error fetching active categories:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

export const habilitarCategoria = async (id) => {
  const URL = `${BASE_URL}/categories/${id}/activate`; // Endpoint para habilitar la categoría
  const token = localStorage.getItem('adminToken'); // Obtener el token desde localStorage (o desde donde lo tengas almacenado)

  // Verifica si el token existe
  if (!token) {
    console.error('No token found. Please login first.');
    return null; // O redirige al login
  }

  const headers = {
    Authorization: `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
  };

  try {
    const response = await axios.patch(
      URL,
      { status: 'active' }, // Enviar el estado como 'active' para habilitar
      { headers }, // Incluir los headers con el token
    );
    return response.data; // Retornar la respuesta de la API (categoría habilitada)
  } catch (error) {
    console.error(
      'Error enabling category:',
      error.response?.data || error.message,
    );
    return null; // Retornar null en caso de error
  }
};

// Función para consultar categorías inhabilitadas
export const consultaCategoriasInhabilitadas = async (headers) => {
  const URL = `${BASE_URL}/categories`; // Endpoint para obtener todas las categorías
  try {
    const response = await axios.get(URL, { headers }); // Obtener todas las categorías
    // Filtrar categorías deshabilitadas (isDeleted: true)
    const deactivatedCategories = response.data.filter(
      (category) => category.isDeleted,
    );
    return deactivatedCategories; // Retornar solo las categorías deshabilitadas
  } catch (error) {
    console.error('Error fetching deactivated categories:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para consultar una categoría por ID
export const consultaCategoriaPorId = async (id) => {
  const URL = `${BASE_URL}/categories/${id}`;
  try {
    const response = await axios.get(URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching category:',
      error.response?.data || error.message,
    );
    return null;
  }
};

// Función para agregar una nueva categoría
export const agregarCategoria = async (category) => {
  const URL = `${BASE_URL}/categories`;
  try {
    const formData = new FormData();
    formData.append('name', category.name);
    formData.append('description', category.description);
    formData.append('image', category.image);

    const response = await axios.post(URL, formData, {
      ...getAuthHeaders(),
      'Content-Type': 'multipart/form-data',
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error adding category:',
      error.response?.data || error.message,
    );
    return null;
  }
};

// Función para editar una categoría existente
export const editarCategoria = async (id, category) => {
  const URL = `${BASE_URL}/categories/${id}`;
  try {
    const formData = new FormData();
    formData.append('name', category.name);
    formData.append('description', category.description);
    if (category.image) {
      formData.append('image', category.image);
    }

    const response = await axios.put(URL, formData, {
      ...getAuthHeaders(),
      'Content-Type': 'multipart/form-data',
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error editing category:',
      error.response?.data || error.message,
    );
    return null;
  }
};

// Función para desactivar una categoría
export const desactivarCategoria = async (id) => {
  const URL = `${BASE_URL}/categories/${id}/deactivate`;
  try {
    const response = await axios.patch(
      URL,
      { status: 'inactive' },
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error deactivating category:',
      error.response?.data || error.message,
    );
    return null;
  }
};

// Función para actualizar la imagen de una categoría
export const actualizarImagenCategoria = async (id, imageFile) => {
  const URL = `${BASE_URL}/categories/${id}/image`;
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axios.patch(URL, formData, {
      headers: {
        ...getAuthHeaders().headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Retorna la respuesta deseada
  } catch (error) {
    console.error(
      'Error updating category image:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Función para eliminar una categoría
export const eliminarCategoria = async (id) => {
  const URL = `${BASE_URL}/categories/${id}`;
  try {
    await axios.delete(URL, getAuthHeaders());
    return true;
  } catch (error) {
    console.error(
      'Error deleting category:',
      error.response?.data || error.message,
    );
    return false;
  }
};
