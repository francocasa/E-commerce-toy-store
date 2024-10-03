import { useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { DashSquareFill, PlusSquareFill } from 'react-bootstrap-icons';

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
      <div className="flex justify-start items-center gap-2 mt-2">
        <DashSquareFill
          className={`text-xl select-none ${quantity <= 1 ? 'text-gray-300 hover:text-gray-300 cursor-default' : 'text-blue-500 cursor-pointer hover:text-blue-400'}`}
          onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}
        />

        <p className="text-sm md:text-base">{quantity}</p>

        <PlusSquareFill
          className="text-xl text-blue-500 cursor-pointer hover:text-blue-400 select-none"
          onClick={() => setQuantity(quantity + 1)}
        />
      </div>
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
