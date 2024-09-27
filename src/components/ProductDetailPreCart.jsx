import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTruck } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ProductDetailPreCart = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const calculateTotal = () => {
    let price = product.price;

    // Aplicar descuento del 30% si categoryPromo es 'Navidad'
    if (product.categoryPromo === 'Navidad') {
      price *= 0.7; // 30% de descuento
    }

    // Aplicar descuento del 33.33% si categoryPromo es '3x2' y la cantidad es múltiplo de 3
    if (product.categoryPromo === '3x2' && quantity % 3 === 0) {
      price *= 0.66667; // 33.33% de descuento
    }

    return price * quantity;
  };

  const total = calculateTotal();

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('Cart')) || [];
    const existingProduct = existingCart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si ya existe en el carrito
      Swal.fire({
        title: 'Producto ya en el carrito',
        text: 'Ya colocaste este producto al carrito',
        icon: 'info',
      });
    } else {
      // Si se añade el producto
      existingCart.push({ ...product, quantity });
      localStorage.setItem('Cart', JSON.stringify(existingCart));
      Swal.fire({
        title: 'Producto añadido',
        text: 'Se añadió el producto al carrito',
        icon: 'success',
      });
    }
  };

  // Mensaje de promoción
  const promotionMessage = () => {
    if (product.categoryPromo === 'Navidad') {
      return 'Promoción 30% de descuento por Navidad';
    } else if (product.categoryPromo === '3x2') {
      return 'Para compras múltiplos de 3, hay descuento de 33.33%';
    }
    return null;
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
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
