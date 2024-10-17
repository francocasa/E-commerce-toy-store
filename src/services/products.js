import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

// Función para consultar todos los productos
export const consultaProductos = async () => {
  const URL = `${BASE_URL}/products`;
  try {
    const response = await axios.get(URL);
    return response.data; // Retornar los datos obtenidos
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
    console.error('Error fetching brands:', error);
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
  const URL = `${BASE_URL}/brands`; // Ajusta la ruta según tu API
  try {
    const response = await axios.get(URL);
    return response.data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching brands:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para consultar promociones
export const consultaPromociones = async () => {
  const URL = `${BASE_URL}/products`; // Asegúrate de que esta ruta sea correcta
  try {
    const response = await axios.get(URL);
    // Filtrar productos con discountId no nulo
    const promotions = response.data.filter(
      (product) => product.discountId !== null,
    );
    return promotions; // Retornar las promociones filtradas
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para consultar descuentos
export const consultaDescuentos = async () => {
  const URL = `${BASE_URL}/discounts`; // Construir la URL para los descuentos
  try {
    const response = await axios.get(URL);
    return response.data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching discounts:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

// Función para agregar un nuevo producto
export const agregarProducto = async (producto) => {
  const URL = `${BASE_URL}/products`;
  try {
    const response = await axios.post(
      URL,
      {
        ...producto,
        image: producto.image[0].url, // Asegúrate de que la imagen esté en el formato correcto
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data; // Retornar el producto agregado
  } catch (error) {
    console.error('Error adding product:', error);
    return null; // Retornar null en caso de error
  }
};

// Función para editar un producto existente
export const editarProducto = async (id, producto) => {
  const URL = `${BASE_URL}/products/${id}`;
  try {
    const response = await axios.put(URL, producto, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Retornar el producto editado
  } catch (error) {
    console.error('Error editing product:', error);
    return null; // Retornar null en caso de error
  }
};

// Función para eliminar un producto
export const eliminarProducto = async (id) => {
  const URL = `${BASE_URL}/products/${id}`;
  try {
    await axios.delete(URL).then((response) => {
      console.log(response);
    });
    return true; // Retornar true si se eliminó correctamente
  } catch (error) {
    console.error('Error deleting product:', error);
    return false; // Retornar false en caso de error
  }
};
