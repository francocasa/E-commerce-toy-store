import { useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

export default function AddToCart({ product }) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('Cart')) || [];
    const existingProduct = existingCart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Reemplazar la cantidad del producto
      existingProduct.quantity = quantity;
      Swal.fire({
        title: 'Cantidad actualizada',
        text: 'Has actualizado la cantidad para la compra',
        icon: 'info',
      });
    } else {
      // Si se añade el producto
      existingCart.push({ ...product, quantity });
      Swal.fire({
        title: 'Producto añadido',
        text: 'Se añadió el producto al carrito',
        icon: 'success',
      });
    }

    localStorage.setItem('Cart', JSON.stringify(existingCart));
  };

  return (
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
  );
}

// Validación de prop-types
AddToCart.propTypes = {
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
