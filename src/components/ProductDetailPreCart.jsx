import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTruck } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ProductDetailPreCart = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const total = product.price * quantity;

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

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-center mb-4">
        Detalles del Carrito
      </h2>
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
  }).isRequired,
};

export default ProductDetailPreCart;
