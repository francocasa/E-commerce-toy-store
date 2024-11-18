import PropTypes from 'prop-types';
import { useCounter } from './counter/Context';
import { useNavigate } from 'react-router-dom';
import { payment } from '../services/cart';
import Swal from 'sweetalert2';

export default function CartSummary({ subtotal, discounts }) {
  const { user, token } = useCounter();
  const navigate = useNavigate();
  //const { CartItems, setCartItems } = useCounter();

  const paymentCart = async (e) => {
    e.preventDefault();

    // Comprobar si el usuario ya está registrado
    if (user.id !== undefined) {
      const responseData = await payment(user.id, token);
      console.log('responseData');
      console.log(responseData);

      if (responseData) {
        window.open(responseData, '_blank');
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Debe de iniciar sesión',
        icon: 'error',
        confirmButtonText: 'Iniciar sesión',
      }).then(() => {
        navigate('/login');
      });
    }
  };

  return (
    <aside className="border rounded-lg shadow w-full flex flex-col p-4 font-medium gap-4 h-fit sm:gap-6 lg:w-1/3">
      <header>
        <h1 className="px-2 text-lg text-center lg:text-left">
          Resumen de compra
        </h1>
      </header>

      <section className="flex-grow px-2 space-y-4 sm:flex sm:gap-6 sm:space-y-0 lg:flex-col lg:min-w-64">
        <div className="space-y-1 sm:flex-grow">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="font-black">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Descuentos</p>
            <p className="font-black">${discounts.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Total</p>
            <p className="font-black">${(subtotal - discounts).toFixed(2)}</p>
          </div>
        </div>

        <div className="flex gap-2 sm:w-1/3 sm:flex-col lg:w-full">
          <a className="block flex-grow text-center py-1 text-base text-slate-500 border-2 border-slate-400 rounded-md font-bold cursor-pointer hover:bg-slate-400 hover:text-white transition-colors lg:py-2">
            Seguir Comprando
          </a>
          <a
            onClick={paymentCart}
            className="block flex-grow text-center py-1 text-white text-base  border-2 border-blue-500 bg-blue-500 rounded-md font-bold hover:bg-blue-400 hover:border-blue-400 cursor-pointer transition-colors lg:py-2"
          >
            Pagar
          </a>
        </div>
      </section>

      <footer className="text-center mt-1">
        <a href="#">Política de Devoluciones</a>
      </footer>
    </aside>
  );
}

// Validación de tipos de las props
CartSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  discounts: PropTypes.number.isRequired,
};
