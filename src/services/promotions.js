const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

export const consultaPromociones = async () => {
  const URL = `${BASE_URL}/products`; // Construir la URL para los productos

  try {
    const response = await fetch(URL); // Usar la URL construida
    if (!response.ok) {
      throw new Error('Error en la red');
    }
    const data = await response.json();
    // Filtrar productos con promociones
    const filtered = data.filter((product) => product.promocion);
    return filtered; // Retornar las promociones obtenidas
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};
