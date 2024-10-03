const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

export const consultaProductos = async () => {
  const URL = `${BASE_URL}/products`; // Construir la URL para los producstos

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error('Error en la red');
    }
    const data = await response.json();
    return data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};

export const consultaProductoPorId = async (id) => {
  const URL = `${BASE_URL}/products/${id}`; // Construir la URL para un producto específico

  try {
    const response = await fetch(URL); // Usar la URL construida
    if (!response.ok) {
      throw new Error('Error en la red');
    }
    const data = await response.json();
    return data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching product:', error);
    return null; // Retornar null en caso de error
  }
};

// Nueva función para agregar un producto
export const agregarProducto = async (producto) => {
  const URL = `${BASE_URL}/products`;
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });
    if (!response.ok) {
      throw new Error('Error al agregar el producto');
    }
    return await response.json(); // Retornar el producto agregado
  } catch (error) {
    console.error('Error adding product:', error);
    return null;
  }
};

// Nueva función para editar un producto
export const editarProducto = async (id, producto) => {
  const URL = `${BASE_URL}/products/${id}`;
  try {
    const response = await fetch(URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });
    if (!response.ok) {
      throw new Error('Error al editar el producto');
    }
    return await response.json(); // Retornar el producto editado
  } catch (error) {
    console.error('Error editing product:', error);
    return null;
  }
};

// Nueva función para eliminar un producto
export const eliminarProducto = async (id) => {
  const URL = `${BASE_URL}/products/${id}`;
  try {
    const response = await fetch(URL, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el producto');
    }
    return true; // Retornar true si se eliminó correctamente
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};
