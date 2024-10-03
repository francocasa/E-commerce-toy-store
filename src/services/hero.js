// services/hero.js
const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

export const fetchHeroData = async () => {
  const URL = `${BASE_URL}/hero`; // Construir la URL para los datos del héroe

  try {
    const response = await fetch(URL); // Usar la URL construida
    if (!response.ok) {
      throw new Error('Error en la red');
    }
    const data = await response.json();
    return data; // Retornar los datos obtenidos
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
};
