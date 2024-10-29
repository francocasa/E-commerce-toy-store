// import { useEffect, useState } from 'react';
import { CartItem, CartSummary } from '../components';
import { useCounter } from '../components/counter/Context';

function CartPage() {
  const { cartItems, setCartItems } = useCounter();

  const calculateTotal = (product) => {
    let price = product.price;

    return price * product.quantity;
  };

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
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, quantity) };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('Cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('Cart', JSON.stringify(updatedCart));
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
                // Verifica que title esté definido
                if (!item.title) {
                  console.error(
                    `El artículo con id ${item.id} no tiene un título definido.`,
                  );
                  return null; // O manejar de otra forma
                }
                return (
                  <CartItem
                    key={item.id}
                    item={{ ...item, total: calculateTotal(item) }}
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
