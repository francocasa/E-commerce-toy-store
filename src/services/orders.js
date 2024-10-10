import axios from 'axios';
import { consultaProductoPorId } from './products'; // Importa la función para consultar productos

const BASE_URL = import.meta.env.VITE_API_URL;

export const consultaOrdenPorId = async (orderId) => {
  const URL = `${BASE_URL}/orderItems`;
  try {
    const response = await axios.get(URL);
    const orderItems = response.data.filter((item) => item.orderId === orderId);

    // Obtener los precios de cada producto y agregar al orderItem
    const orderItemsWithPrice = await Promise.all(
      orderItems.map(async (item) => {
        const product = await consultaProductoPorId(item.productId);
        return {
          ...item,
          price: product ? product.price : 0,
        };
      }),
    );

    return orderItemsWithPrice;
  } catch (error) {
    console.error('Error fetching order items:', error);
    return [];
  }
};
