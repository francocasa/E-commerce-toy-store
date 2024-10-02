import PropTypes from 'prop-types';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { id, title, price, image, quantity } = item;

  return (
    <article className="flex flex-col md:flex-row gap-4 px-3 py-4">
      <div className="h-32 w-full md:h-24 md:w-32 aspect-square">
        <img className="w-full h-full object-contain" src={image} alt={title} />
      </div>
      <div className="flex-grow flex flex-col md:flex-row justify-between">
        <div className="flex flex-col justify-between flex-grow">
          <div className="space-y-1">
            <h2 className="font-medium">{title}</h2>
            <p className="text-sm text-slate-700">
              Precio: ${price.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-start items-center gap-2 mt-2">
            <button
              className="border w-8 h-8 flex justify-center items-center font-black rounded-md bg-blue-500 text-white hover:bg-blue-400"
              onClick={() => onUpdateQuantity(id, quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              className="border w-8 h-8 flex justify-center items-center font-black rounded-md bg-blue-500 text-white hover:bg-blue-400"
              onClick={() => onUpdateQuantity(id, quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center px-4 mt-4 md:mt-0">
          <p className="text-sm text-slate-700">Subtotal</p>
          <p className="font-bold">${(price * quantity).toFixed(2)}</p>
          <button
            className="text-red-500 hover:underline mt-2"
            onClick={() => onRemove(id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}

// Validación de tipos de las props
CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
