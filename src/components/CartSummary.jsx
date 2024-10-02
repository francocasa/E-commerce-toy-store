import PropTypes from 'prop-types';

export default function CartSummary({ subtotal, discounts }) {
  return (
    <aside className="border rounded-lg shadow w-full md:w-1/4 flex flex-col p-5 font-medium gap-6 h-fit">
      <header>
        <h1 className="text-lg text-center md:text-left">Resumen de compra</h1>
      </header>

      <section className="flex-grow px-2 space-y-6">
        <div className="space-y-3">
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

        <div className="space-y-3">
          <a className="block text-center py-2 text-white border-2 border-blue-500 bg-blue-500 rounded-md font-bold hover:bg-blue-400 hover:border-blue-400 cursor-pointer transition-colors">
            Pagar
          </a>
          <a className="block text-center w-full py-2 text-slate-500 border-2 border-slate-400 rounded-md font-bold cursor-pointer hover:bg-slate-400 hover:text-white transition-all">
            Seguir Comprando
          </a>
        </div>
      </section>

      <footer className="text-center mt-4">
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
