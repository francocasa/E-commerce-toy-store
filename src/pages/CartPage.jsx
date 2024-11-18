// import { useEffect, useState } from 'react';
import { CartItem, CartSummary } from '../components';
import { useCounter } from '../components/counter/Context';

function CartPage() {
  const { cartItems, updateCartItem, deleteCartItem } = useCounter();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const discounts = cartItems.reduce((acc, item) => {
    let discount = 0;

    discount += item.quantity * item.discount;

    return acc + discount;
  }, 0);

  const total = subtotal - discounts;

  const updateQuantity = (id, quantity) => {
    const cartItem = cartItems.filter((item) => item.id === id);
    updateCartItem(cartItem[0], quantity);
  };

  const removeItem = (id) => {
    const cartItem = cartItems.filter((item) => item.id === id);
    deleteCartItem(cartItem[0]);
  };

  return (
    <main className="container max-w-6xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex flex-col lg:flex-row gap-4">
        <section className="border rounded-lg shadow w-full p-4 pb-2 h-fit lg:p-5">
          <h1 className="font-medium mb-1 text-xl">Carrito</h1>
          <div className="divide-y-2">
            {cartItems.length === 0 ? (
              <p>No hay artículos en el carrito.</p>
            ) : (
              cartItems.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                );
              })
            )}
          </div>
        </section>

        <CartSummary subtotal={subtotal} discounts={discounts} total={total} />
      </div>
    </main>
  );
}

export default CartPage;
