import { useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { DashSquareFill, PlusSquareFill } from 'react-bootstrap-icons';
import { useCounter } from './counter/Context';
const IMAGES_URL = import.meta.env.VITE_IMAGES_URL; // Obtener la URL base desde el .env

export default function AddToCart({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { setCartItems } = useCounter();
  const imageUrl =
    Array.isArray(product.images) && product.images.length > 0
      ? IMAGES_URL + '/' + product.images[0].url
      : '';

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('Cart')) || [];
    const existingProduct = existingCart.find((item) => item.id === product.id); // Comparar por id como string
    console.log('1');
    if (existingProduct) {
      // Aumentar la cantidad del producto existente
      existingProduct.quantity += quantity;
      Swal.fire({
        title: 'Cantidad actualizada',
        text: 'Has actualizado la cantidad para la compra',
        icon: 'info',
      });
    } else {
      let finalPrice = product.price;
      let discount = 0;
      if (product.discountId) {
        discount = (product.price * product.discount.discount).toFixed(2);
        finalPrice = (product.price * (1 - product.discount.discount)).toFixed(
          2,
        );
      }
      existingCart.push({
        id: product.id, // Se mantiene como string
        title: product.name, // Cambiado de title a name
        price: product.price,
        finalPrice: parseFloat(finalPrice),
        discount: discount,
        image: imageUrl, // Asegúrate de obtener la URL de la imagen
        quantity,
        categoryId: product.categoryId, // Añadir categoryId aquí
      });
      Swal.fire({
        title: 'Producto añadido',
        text: 'Se añadió el producto al carrito',
        icon: 'success',
      });
    }
    setCartItems(existingCart);
    localStorage.setItem('Cart', JSON.stringify(existingCart));
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
    id: PropTypes.string.isRequired, // Se mantiene como string
    name: PropTypes.string.isRequired, // Cambiado de title a name
    price: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
    description: PropTypes.string, // Si necesitas usarlo
    brandId: PropTypes.string,
    materialId: PropTypes.string,
    categoryId: PropTypes.string.isRequired, // Asegúrate de que categoryId sea requerido
    discountId: PropTypes.string,
    discount: PropTypes.shape({
      discount: PropTypes.number.isRequired,
    }), // Se añade el shape de discount
  }).isRequired,
};
