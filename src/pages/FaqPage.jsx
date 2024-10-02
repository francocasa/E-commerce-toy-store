function FAQsPage() {
  return (
    <main className="my-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Preguntas Frecuentes
        </h1>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">
            ¿Qué métodos de pago aceptan?
          </h2>
          <p>Aceptamos tarjetas de crédito, débito y PayPal.</p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">
            ¿Hacen envíos a todo el país?
          </h2>
          <p>Sí, realizamos envíos a todas las regiones del país.</p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">
            ¿Puedo devolver un producto?
          </h2>
          <p>
            Sí, aceptamos devoluciones dentro de los 30 días posteriores a la
            compra, siempre y cuando el producto esté en su estado original.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">
            ¿Cómo puedo contactar al servicio al cliente?
          </h2>
          <p>
            Puedes contactarnos a través de nuestro correo electrónico:
            soporte@juguetitos.com o llamarnos al (01) 234-5678.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">
            ¿Ofrecen descuentos por compras al por mayor?
          </h2>
          <p>
            Sí, ofrecemos descuentos en compras al por mayor. Por favor,
            contáctanos para más información.
          </p>
        </div>
      </div>
    </main>
  );
}

export default FAQsPage;
