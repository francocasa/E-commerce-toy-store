import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

// Función para consultar los materiales inhabilitados
export const consultaMaterialesInhabilitados = async () => {
  const URL = `${BASE_URL}/materials`;
  try {
    const response = await axios.get(URL);
    // Filtrar solo los materiales que están inhabilitados (isDeleted: true)
    return response.data.filter((material) => material.isDeleted);
  } catch (error) {
    console.error('Error fetching disabled materials:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para habilitar un material
export const habilitarMaterial = async (id) => {
  const URL = `${BASE_URL}/materials/${id}/activate`; // Endpoint para activar el material
  const token = localStorage.getItem('adminToken'); // Obtener el token de autenticación

  try {
    const response = await axios.patch(
      URL,
      { isDeleted: false }, // Cambiar el valor de isDeleted a false
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // Retornar el material habilitado
  } catch (error) {
    console.error('Error enabling material:', error);
    return null;
  }
};

// Función para deshabilitar un material
export const deshabilitarMaterial = async (id) => {
  const URL = `${BASE_URL}/materials/${id}/deactivate`; // Endpoint para desactivar el material
  const token = localStorage.getItem('adminToken'); // Obtener el token

  try {
    const response = await axios.patch(
      URL,
      { isDeleted: true }, // Cambiar el valor de isDeleted a true
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // Retornar el material deshabilitado
  } catch (error) {
    console.error('Error disabling material:', error);
    return null;
  }
};

// Función para consultar todos los materiales
export const consultaMateriales = async () => {
  const URL = `${BASE_URL}/materials`;
  try {
    const response = await axios.get(URL);
    return response.data.filter((discount) => !discount.isDeleted); // Filtrar solo los habilitados
  } catch (error) {
    console.error('Error fetching enabled discounts:', error);
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
