import { useState } from 'react';
import PropTypes from 'prop-types';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { DashSquareFill, PlusSquareFill } from 'react-bootstrap-icons';

export default function AddToCart({ product }) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('Cart')) || [];
    const existingProduct = existingCart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Aumentar la cantidad del producto existente
      existingProduct.quantity += quantity;
      showToast(
        'Cantidad actualizada',
        'Has actualizado la cantidad para la compra',
        'info',
      );
    } else {
      // Si se añade el producto
      existingCart.push({
        id: product.id,
        title: product.name,
        price: product.price,
        image: product.image[0].url,
        quantity,
        categoryId: product.categoryId,
      });
      showToast(
        'Producto añadido',
        'Se añadió el producto al carrito',
        'success',
      );
    }

    localStorage.setItem('Cart', JSON.stringify(existingCart));
  };

  const showToast = (title, text, type) => {
    Toastify({
      text: `${title}: ${text}`,
      duration: 3000,
      gravity: 'top', // Mantiene la posición en la parte superior
      position: 'right', // Cambiado a 'right'
      backgroundColor: type === 'success' ? '#4CAF50' : '#FF9800',
      stopOnFocus: true,
      offset: {
        x: 20, // Distancia desde el borde derecho
        y: 60, // Distancia desde la parte superior
      },
    }).showToast();
  };

  return (
    <div className="flex gap-4">
      <div className="flex justify-start items-center gap-2">
        <DashSquareFill
          className={`text-2xl select-none ${quantity <= 1 ? 'text-gray-300 hover:text-gray-300 cursor-default' : 'text-blue-500 cursor-pointer hover:text-blue-400'}`}
          onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}
        />
        <p className="text-sm md:text-base">{quantity}</p>
        <PlusSquareFill
          className="text-2xl text-blue-500 cursor-pointer hover:text-blue-400 select-none"
          onClick={() => setQuantity(quantity + 1)}
        />
      </div>
      <button
        onClick={addToCart}
        className="bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-400 transition"
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
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
    description: PropTypes.string,
    brandId: PropTypes.string,
    materialId: PropTypes.string,
    categoryId: PropTypes.string.isRequired,
    discountId: PropTypes.string,
  }).isRequired,
};
