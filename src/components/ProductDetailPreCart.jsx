import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTruck } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useCounter } from '../components/counter/Context';

const ProductDetailPreCart = ({ product }) => {
  const { addCartItem, deleteCartItem } = useCounter();
  const [quantity, setQuantity] = useState(1);

  console.log('product', product);

  const calculateTotal = () => {
    let price = product.price;
    return price * quantity;
  };

  const total = calculateTotal();

  const addToCart = async () => {
    await addCartItem(product.id, quantity);
  };

  // Mensaje de promoción
  const promotionMessage = () => {
    if (product.categoryPromo === 'Navidad') {
      return 'Promoción 30% de descuento por Navidad';
    } else if (product.categoryPromo === '3x2') {
      return 'Para compras múltiples de 3, hay descuento de 33.33%';
    }
    return null;
  };

  return (
    <div className="bg-gray-100 p-4 md:p-6 rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-center mb-4">
        Detalles del Carrito
      </h2>
      {promotionMessage() && (
        <h3 className="text-sm text-center text-green-600 mb-2">
          {promotionMessage()}
        </h3>
      )}
      <h3 className="text-lg font-semibold text-center mb-4">
        Total: ${total.toFixed(2)}
      </h3>
      <div className="flex items-center my-4 justify-center">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded-md p-2 mr-2 w-20 text-center"
        />
        <button
          onClick={addToCart}
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          Añadir al carrito
        </button>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <FaTruck className="mr-2 text-2xl" />
          <div>
            <p>Se tiene la política de:</p>
            <p>Agrega el producto al carrito y podemos coordinar delivery.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Validación de prop-types
ProductDetailPreCart.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    descripcion: PropTypes.string,
    marca: PropTypes.string,
    material: PropTypes.string,
    categoryPromo: PropTypes.string, // Agregar validación para categoryPromo
  }).isRequired,
};

export default ProductDetailPreCart;
