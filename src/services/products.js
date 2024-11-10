import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env
// Función para consultar los productos inhabilitados
export const consultaProductosInhabilitados = async () => {
  const URL = `${BASE_URL}/products`;
  try {
    const response = await axios.get(URL);
    // Filtrar solo los productos inhabilitados (isDeleted: true)
    return response.data.filter((product) => product.isDeleted);
  } catch (error) {
    console.error('Error fetching disabled products:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para habilitar un producto
export const habilitarProducto = async (id) => {
  const URL = `${BASE_URL}/products/${id}/activate`; // Endpoint para activar el producto
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
    return response.data; // Retornar el producto habilitado
  } catch (error) {
    console.error('Error enabling product:', error);
    return null;
  }
};
// Función para deshabilitar un producto
export const deshabilitarProducto = async (id) => {
  const URL = `${BASE_URL}/products/${id}/deactivate`; // Endpoint para desactivar el producto
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
    return response.data; // Retornar el producto deshabilitado
  } catch (error) {
    console.error('Error disabling product:', error);
    return null;
  }
};

// Función para consultar todos los productos
export const consultaProductos = async () => {
  const URL = `${BASE_URL}/products`;
  try {
    const response = await axios.get(URL);
    // Filtrar solo los productos habilitados (isDeleted: false)
    return response.data.filter((product) => !product.isDeleted);
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para consultar un producto por ID
export const consultaProductoPorId = async (id) => {
  const URL = `${BASE_URL}/products/${id}`;
  try {
    const response = await axios.get(URL);
    return response.data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching product:', error);
    return null; // Retornar null en caso de error
  }
};

// Función para consultar todas las marcas
export const consultaMarcas = async () => {
  const URL = `${BASE_URL}/brands`; // Ajusta la ruta según tu API
  try {
    const response = await axios.get(URL);
    return response.data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para consultar todos los materiales
export const consultaMaterials = async () => {
  const URL = `${BASE_URL}/materials`; // Ajusta la ruta según tu API
  try {
    const response = await axios.get(URL);
    return response.data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching materials:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para consultar todas las categorías
export const consultaCategories = async () => {
  const URL = `${BASE_URL}/categories`; // Ajusta la ruta según tu API
  try {
    const response = await axios.get(URL);
    return response.data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para consultar promociones
export const consultaPromociones = async () => {
  const URL = `${BASE_URL}/discounts`; // Asegúrate de que esta ruta sea correcta
  try {
    const response = await axios.get(URL);
    // Filtrar productos con discountId no nulo y no vacío
    const promotions = response.data.filter(
      (product) => product.discountId !== null && product.discountId !== '',
    );
    return promotions; // Retornar las promociones filtradas
  } catch (error) {
    console.error('Error fetching promotions:', error.message || error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para consultar descuentos
export const consultaDescuentos = async () => {
  const URL = `${BASE_URL}/discounts`; // Asegúrate de que BASE_URL esté correctamente configurada
  try {
    const response = await axios.get(URL);
    console.log('Descuentos obtenidos:', response.data); // Agrega un log para verificar la respuesta
    return response.data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching discounts:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para agregar un nuevo producto
export const agregarProducto = async (producto) => {
  const URL = `${BASE_URL}/products`;
  const token = localStorage.getItem('adminToken'); // Obtener el token

  try {
    const response = await axios.post(URL, producto, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Agregar el token
      },
    });
    return response.data; // Retornar el producto agregado
  } catch (error) {
    console.error('Error adding product:', error);
    return null; // Retornar null en caso de error
  }
};

// Función para editar un producto existente
export const editarProducto = async (id, producto) => {
  const URL = `${BASE_URL}/products/${id}`;
  const token = localStorage.getItem('adminToken');

  try {
    const response = await axios.put(URL, producto, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error editing product:', error.response.data); // Imprime el error detallado
    return null;
  }
};

// Función para eliminar un producto
export const eliminarProducto = async (id) => {
  const URL = `${BASE_URL}/products/${id}`;
  try {
    await axios.delete(URL).then((response) => {});
    return true; // Retornar true si se eliminó correctamente
  } catch (error) {
    console.error('Error deleting product:', error);
    return false; // Retornar false en caso de error
  }
};
