import { useEffect, useState } from 'react';
import { CartItem, CartSummary } from '../components';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('Cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const calculateTotal = (product) => {
    let price = product.price;

    // Aplicar descuentos
    if (product.categoryPromo === 'Navidad') {
      price *= 0.7;
    }
    if (product.categoryPromo === '3x2' && product.quantity % 3 === 0) {
      price *= 0.66667;
    }

    return price * product.quantity;
  };

  // Calcular subtotal sin descuentos
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // Calcular descuentos
  const discounts = cartItems.reduce((acc, item) => {
    let discount = 0;
    if (item.categoryPromo === 'Navidad') {
      discount += item.price * item.quantity * 0.3;
    }
    if (item.categoryPromo === '3x2' && item.quantity % 3 === 0) {
      discount += item.price * (item.quantity / 3);
    }
    return acc + discount;
  }, 0);

  // Calcular total
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
    <main className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex flex-col md:flex-row gap-4">
        <section className="border rounded-lg shadow w-full p-4 pb-2 md:w-3/4">
          <h1 className="font-medium mb-1 text-xl">Carrito</h1>
          <div className="divide-y-2">
            {cartItems.length === 0 ? (
              <p>No hay artículos en el carrito.</p>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={{ ...item, total: calculateTotal(item) }}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))
            )}
          </div>
        </section>

        <CartSummary subtotal={subtotal} discounts={discounts} total={total} />
      </div>
    </main>
  );
}

export default CartPage;
