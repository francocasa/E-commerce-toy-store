import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

// Función para consultar todos los descuentos
export const consultaDescuentos = async () => {
  const URL = `${BASE_URL}/discounts`;
  try {
    const response = await axios.get(URL);
    return response.data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching discounts:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para agregar un nuevo descuento
export const agregarDescuento = async (descuento) => {
  const URL = `${BASE_URL}/discounts`;
  const token = localStorage.getItem('adminToken'); // Obtener el token

  try {
    const response = await axios.post(URL, descuento, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Agregar el token
      },
    });
    return response.data; // Retornar el descuento agregado
  } catch (error) {
    console.error('Error adding discount:', error);
    return null; // Retornar null en caso de error
  }
};

// Función para modificar un descuento existente
export const modificarDescuento = async (id, descuento) => {
  const URL = `${BASE_URL}/discounts/${id}`;
  const token = localStorage.getItem('adminToken');

  try {
    const response = await axios.put(URL, descuento, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Retornar el descuento modificado
  } catch (error) {
    console.error('Error updating discount:', error);
    return null; // Retornar null en caso de error
  }
};

// Función para eliminar un descuento
export const eliminarDescuento = async (id) => {
  const URL = `${BASE_URL}/discounts/${id}`;
  try {
    await axios.delete(URL);
    return true; // Retornar true si se eliminó correctamente
  } catch (error) {
    console.error('Error deleting discount:', error);
    return false; // Retornar false en caso de error
  }
};
