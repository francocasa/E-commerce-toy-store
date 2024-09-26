import { CartItem, CartSummary } from '../components';

function CartPage() {
  return (
    <main className="container mx-auto p-8">
      <div className="flex gap-3 mt-7">
        <section className="border rounded-lg shadow w-3/4 p-6">
          <h1 className="font-medium mb-4 text-xl">Carrito</h1>

          <div>
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
        </section>
        <CartSummary />
      </div>
    </main>
  );
}

export default CartPage;
