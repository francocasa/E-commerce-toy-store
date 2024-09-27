export default function CartItem() {
  return (
    <article className="flex gap-6 px-3 py-4">
      <div className="h-24 aspect-square">
        <img
          className="w-full h-full object-contain"
          src="/src/assets/Products/juguete1.png"
          alt=""
        />
      </div>
      <div className="flex-grow flex justify-between">
        <div className="flex flex-col justify-between">
          <div className="space-y-1">
            <h2 className="font-medium">Nombre del producto</h2>
            <p className="text-sm text-slate-700">Precio: $100.00</p>
          </div>

          <div className="flex justify-start items-center gap-2">
            <button className="border w-5 h-5 flex justify-center items-center font-black rounded-md bg-blue-500 text-white hover:bg-blue-400">
              -
            </button>
            <p>1</p>
            <button className="border w-5 h-5 flex justify-center items-center font-black rounded-md bg-blue-500 text-white hover:bg-blue-400">
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center px-4">
          <p className="text-sm text-slate-700">Subtotal</p>
          <p className="font-bold">$100.00</p>
        </div>
      </div>
    </article>
  );
}
