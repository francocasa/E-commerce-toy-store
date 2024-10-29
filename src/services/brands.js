import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

// Función para consultar todas las marcas
export const consultaMarcas = async () => {
  const URL = `${BASE_URL}/brands`;
  try {
    const response = await axios.get(URL);
    return response.data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching brands:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para agregar una nueva marca
export const agregarMarca = async (marca) => {
  const URL = `${BASE_URL}/brands`;
  const token = localStorage.getItem('adminToken'); // Obtener el token

  try {
    const response = await axios.post(URL, marca, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Agregar el token
      },
    });
    return response.data; // Retornar la marca agregada
  } catch (error) {
    console.error('Error adding brand:', error);
    return null; // Retornar null en caso de error
  }
};

// Función para eliminar una marca
export const eliminarMarca = async (id) => {
  const URL = `${BASE_URL}/brands/${id}`;
  try {
    await axios.delete(URL);
    return true; // Retornar true si se eliminó correctamente
  } catch (error) {
    console.error('Error deleting brand:', error);
    return false; // Retornar false en caso de error
  }
};

// Función para consultar una marca por ID
export const consultaMarcaPorId = async (id) => {
  const URL = `${BASE_URL}/brands/${id}`;
  try {
    const response = await axios.get(URL);
    return response.data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching brand:', error);
    return null; // Retornar null en caso de error
  }
};

// Función para editar una marca existente
export const editarMarca = async (id, marca) => {
  const URL = `${BASE_URL}/brands/${id}`;
  const token = localStorage.getItem('adminToken');

  try {
    const response = await axios.put(URL, marca, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Retornar la marca editada
  } catch (error) {
    console.error('Error editing brand:', error);
    return null; // Retornar null en caso de error
  }
};
