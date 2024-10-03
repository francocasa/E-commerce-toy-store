import PropTypes from 'prop-types';
import {
  DashSquareFill,
  PlusSquareFill,
  TrashFill,
} from 'react-bootstrap-icons';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { id, title, price, image, quantity } = item;

  return (
    <article className="flex flex-row gap-5 px-3 py-4 relative md:py-5">
      <div className="h-24 overflow-hidden aspect-square flex justify-center items-center md:h-32">
        <img className="" src={image} alt={title} />
      </div>
      <div className="flex-grow flex flex-col md:flex-row justify-between">
        <div className="flex flex-col justify-between flex-grow">
          <div className="text-sm md:text-base">
            <h2 className="font-medium text-base mb-2 me-4 md:text-lg">
              {title}
            </h2>
            <p className="text-slate-700">
              Precio: <span className="font-medium">${price.toFixed(2)}</span>
            </p>
            <p className="text-slate-800">
              Subtotal{' '}
              <span className="font-bold">
                ${(price * quantity).toFixed(2)}
              </span>
            </p>
          </div>
          <div className="flex justify-start items-center gap-2 mt-2">
            <DashSquareFill
              className={`text-xl select-none ${quantity <= 1 ? 'text-gray-300 hover:text-gray-300 cursor-default' : 'text-blue-500 cursor-pointer hover:text-blue-400'}`}
              onClick={() => onUpdateQuantity(id, quantity - 1)}
            />

            <p className="text-sm md:text-base">{quantity}</p>

            <PlusSquareFill
              className="text-xl text-blue-500 cursor-pointer hover:text-blue-400 select-none"
              onClick={() => onUpdateQuantity(id, quantity + 1)}
            />
          </div>
        </div>
      </div>
      <div className="absolute right-2 top-4 md:top-5">
        <TrashFill
          className="block text-gray-700 text-xl cursor-pointer hover:text-red-700 hover:scale-125 transition-all sm:text-2xl"
          onClick={() => onRemove(id)}
        />
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
