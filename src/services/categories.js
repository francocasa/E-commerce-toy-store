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

// Función para consultar todas las categorías
export const consultaCategories = async () => {
  const URL = `${BASE_URL}/categories`;
  try {
    const response = await axios.get(URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching categories:',
      error.response?.data || error.message,
    );
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
    console.error(
      'Error fetching category:',
      error.response?.data || error.message,
    );
    return null;
  }
};

// Función para consultar datos (si lo necesitas para otra página)
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

// Función para agregar una nueva categoría
export const agregarCategoria = async (categories) => {
  const URL = `${BASE_URL}/categories`;
  try {
    const formData = new FormData();
    formData.append('name', categories.name);
    formData.append('description', categories.description);
    formData.append('image', categories.image); // Asegúrate de que esto sea un archivo o una URL válida

    const response = await axios.post(URL, formData, {
      ...getAuthHeaders(),
      'Content-Type': 'multipart/form-data', // Importante para subir archivos
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
export const editarCategoria = async (id, categoria) => {
  const URL = `${BASE_URL}/categories/${id}`;
  try {
    const formData = new FormData();
    formData.append('name', categoria.name);
    formData.append('description', categoria.description);
    if (categoria.image) {
      formData.append('image', categoria.image); // Solo añadir si hay una nueva imagen
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

export const actualizarImagenCategoria = async (id, imageFile) => {
  const URL = `${BASE_URL}/categories/${id}/image`;
  const formData = new FormData();
  formData.append('image', imageFile); // Asegúrate de que esto sea un objeto File

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
    return true; // Retornar true si se eliminó correctamente
  } catch (error) {
    console.error(
      'Error deleting category:',
      error.response?.data || error.message,
    );
    return false; // Retornar false en caso de error
  }
};
