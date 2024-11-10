import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

// Función para consultar marcas deshabilitadas
export const consultaMarcasInhabilitadas = async (headers) => {
  const URL = `${BASE_URL}/brands`; // Endpoint para obtener todas las marcas
  try {
    const response = await axios.get(URL, { headers });
    // Filtrar marcas deshabilitadas (isDeleted: true)
    const deactivatedBrands = response.data.filter((brand) => brand.isDeleted);
    return deactivatedBrands; // Retornar solo las marcas deshabilitadas
  } catch (error) {
    console.error('Error fetching deactivated brands:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para habilitar una marca
export const habilitarMarca = async (id, headers) => {
  const URL = `${BASE_URL}/brands/${id}/activate`; // Endpoint para habilitar la marca
  try {
    const response = await axios.patch(
      URL,
      { status: 'active' }, // Enviar el estado como 'active'
      { headers },
    );
    return response.data; // Retornar la respuesta de la API (marca habilitada)
  } catch (error) {
    console.error('Error enabling brand:', error);
    return null; // Retornar null en caso de error
  }
};

// Función para consultar todas las marcas
export const consultaMarcas = async () => {
  const URL = `${BASE_URL}/brands`; // Endpoint para obtener todas las marcas
  try {
    const response = await axios.get(URL); // Obtener todas las marcas, sin filtrar en el backend
    // Filtrar marcas activas (isDeleted: false)
    const activeBrands = response.data.filter((brand) => !brand.isDeleted);
    return activeBrands; // Retornar solo las marcas activas
  } catch (error) {
    console.error('Error fetching active brands:', error);
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
    return response.data; // Retornar el material agregado
  } catch (error) {
    console.error('Error adding brands:', error);
    return null; // Retornar null en caso de error
  }
};

export const desactivarMarca = async (id) => {
  const URL = `${BASE_URL}/brands/${id}/deactivate`; // Endpoint para desactivar la marca
  const token = localStorage.getItem('adminToken'); // Obtener el token

  // Verifica que el token no sea nulo
  if (!token) {
    console.error('No token found');
    return null;
  }

  try {
    const response = await axios.patch(
      URL,
      { status: 'inactive' },
      {
        // Ejemplo de cuerpo si es necesario
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Agregar el token
        },
      },
    );

    // Si la solicitud fue exitosa, loguea la respuesta
    console.log(`Marca con ID ${id} desactivada correctamente:`, response.data);
    return response.data; // Retornar la respuesta de la API (marca desactivada)
  } catch (error) {
    // Muestra el error completo
    console.error(
      'Error deactivating brand:',
      error.response ? error.response.data : error,
    );
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
