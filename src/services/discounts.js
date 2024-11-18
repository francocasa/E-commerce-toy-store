import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

export const getDiscountById = async (id) => {
  const URL = `${BASE_URL}/discounts/${id}`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching discount:', error);
    return null;
  }
};

// Función para consultar los descuentos habilitados (isDeleted: false)
export const consultaDescuentosHabilitados = async () => {
  const URL = `${BASE_URL}/discounts`;
  try {
    const response = await axios.get(URL);
    return response.data.filter((discount) => !discount.isDeleted); // Filtrar solo los habilitados
  } catch (error) {
    console.error('Error fetching enabled discounts:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};
export const checkIfDescriptionExists = async (description) => {
  try {
    // Hacer una consulta a la API para verificar si la descripción ya existe
    const response = await consultaDescuentosHabilitados(); // O podrías hacer la consulta a un endpoint específico que te devuelva todos los descuentos
    const existingDiscount = response.find(
      (discount) =>
        discount.description.toLowerCase() === description.toLowerCase(),
    );
    return existingDiscount ? true : false;
  } catch (error) {
    console.error('Error al verificar la descripción:', error);
    return false; // Si hay un error en la consulta, retornar false
  }
};

// Función para consultar los descuentos inhabilitados (isDeleted: true)
export const consultaDescuentosInhabilitados = async (headers) => {
  const URL = `${BASE_URL}/discounts`; // Endpoint para obtener todos los descuentos
  try {
    const response = await axios.get(URL, { headers }); // Obtener todos los descuentos
    // Filtrar los descuentos deshabilitados (isDeleted: true)
    const deactivatedDiscounts = response.data.filter(
      (discount) => discount.isDeleted,
    );
    return deactivatedDiscounts; // Retornar solo los descuentos deshabilitados
  } catch (error) {
    console.error('Error fetching disabled discounts:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para habilitar un descuento
export const habilitarDescuento = async (id) => {
  const URL = `${BASE_URL}/discounts/${id}/activate`; // Asumimos que la API tiene un endpoint para activar descuentos
  const token = localStorage.getItem('adminToken');

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
    return response.data; // Retornar la respuesta de la API
  } catch (error) {
    console.error('Error enabling discount:', error);
    return null;
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken'); // Obtener el token de autenticación desde el localStorage
  return {
    Authorization: `Bearer ${token}`, // Retornar los headers con el token de autorización
  };
};

// Función para deshabilitar un descuento
export const inhabilitarDescuento = async (id) => {
  const URL = `${BASE_URL}/discounts/${id}/deactivate`; // Endpoint para desactivar el descuento
  const headers = getAuthHeaders();

  if (!headers) {
    console.error('No se encontró el token de autenticación');
    return null; // Si no hay token, retornamos null
  }

  try {
    // Actualizamos directamente el campo isDeleted
    const response = await axios.patch(
      URL,
      { isDeleted: true }, // Cambiar isDeleted a true en lugar de status
      { headers }, // Usamos los headers de autenticación
    );
    return response.data; // Retornar la respuesta de la API (descuento inhabilitado)
  } catch (error) {
    if (error.response) {
      console.error('Error disabling discount:', error.response.data); // Más detalles del error
    } else {
      console.error('Error disabling discount:', error.message);
    }
    return null; // Retornar null en caso de error
  }
};

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
  const URL = `${BASE_URL}/discounts`; // URL de la API para agregar descuentos
  const token = localStorage.getItem('adminToken'); // Obtener el token de autenticación desde localStorage

  // Verificar que el token esté presente
  if (!token) {
    Swal.fire(
      'Error',
      'No se ha encontrado el token de autenticación.',
      'error',
    );
    return null;
  }

  // Extraer los campos que necesitas
  const { description, discount } = descuento; // Solo description y discount son necesarios

  // Crear el objeto a enviar al backend
  const discountToSubmit = {
    description, // Descripción del descuento
    discount, // El valor del descuento (en formato decimal, por ejemplo 0.3 para 30%)
  };

  try {
    // Enviar la solicitud a la API
    const response = await axios.post(URL, discountToSubmit, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Agregar el token en el encabezado de la petición
      },
    });

    // Verificar si la respuesta fue exitosa (código HTTP 201)
    if (response.status === 201) {
      if (response.data && response.data.id) {
        return response.data; // Retornar el descuento agregado
      } else {
        throw new Error('La respuesta no contiene datos válidos');
      }
    } else {
      throw new Error(
        `Error en la creación del descuento: ${response.status} - ${response.statusText}`,
      );
    }
  } catch (error) {
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
