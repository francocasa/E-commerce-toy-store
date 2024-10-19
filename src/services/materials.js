import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

// Función para consultar todos los materiales
export const consultaMateriales = async () => {
  const URL = `${BASE_URL}/materials`;
  try {
    const response = await axios.get(URL);
    return response.data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching materials:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para agregar un nuevo material
export const agregarMaterial = async (material) => {
  const URL = `${BASE_URL}/materials`;
  const token = localStorage.getItem('adminToken'); // Obtener el token

  try {
    const response = await axios.post(URL, material, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Agregar el token
      },
    });
    return response.data; // Retornar el material agregado
  } catch (error) {
    console.error('Error adding material:', error);
    return null; // Retornar null en caso de error
  }
};

// Función para modificar un material existente
export const modificarMaterial = async (id, material) => {
  const URL = `${BASE_URL}/materials/${id}`;
  const token = localStorage.getItem('adminToken');

  try {
    const response = await axios.put(URL, material, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Retornar el material modificado
  } catch (error) {
    console.error('Error updating material:', error);
    return null; // Retornar null en caso de error
  }
};

// Función para eliminar un material
export const eliminarMaterial = async (id) => {
  const URL = `${BASE_URL}/materials/${id}`;
  try {
    await axios.delete(URL);
    return true; // Retornar true si se eliminó correctamente
  } catch (error) {
    console.error('Error deleting material:', error);
    return false; // Retornar false en caso de error
  }
};
