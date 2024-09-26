function CartPage() {
  return (
    <main className="container mx-auto p-8">
      <div className="flex">
        <section className="border rounded-lg shadow w-3/4">
          <h1>Carrito</h1>
          <article className="">
            <p>Product Item Component</p>
          </article>
        </section>
        <aside className="border rounded-lg shadow w-1/4">
          <p>Resumen de compra component</p>
        </aside>
      </div>
    </main>
  );
}

export default CartPage;
