function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto p-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
        <p className="mb-4">
          En Juguetitos, valoramos tu privacidad y nos comprometemos a proteger
          tu información personal. Esta política explica cómo recopilamos,
          usamos y compartimos tus datos.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          1. Información que Recopilamos
        </h2>
        <p className="mb-4">
          Recopilamos información que nos proporcionas al registrarte en nuestro
          sitio, realizar compras, y al interactuar con nuestros servicios. Esto
          incluye:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Email</li>
          <li>Nombre</li>
          <li>Dirección de envío</li>
          <li>Información de pago</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          2. Uso de la Información
        </h2>
        <p className="mb-4">Usamos tu información para:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Procesar y gestionar tus pedidos.</li>
          <li>Comunicarte sobre tu cuenta y pedidos.</li>
          <li>Mejorar nuestros servicios y experiencia de usuario.</li>
          <li>
            Enviarte promociones y actualizaciones, si has dado tu
            consentimiento.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          3. Compartir Información
        </h2>
        <p className="mb-4">
          No vendemos ni alquilamos tu información personal a terceros.
          Compartimos tu información con:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Proveedores de servicios que ayudan a gestionar nuestro negocio.
          </li>
          <li>
            Autoridades legales cuando sea necesario para cumplir con la ley.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          4. Seguridad de la Información
        </h2>
        <p className="mb-4">
          Implementamos medidas de seguridad para proteger tu información
          personal. Sin embargo, ningún método de transmisión por Internet es
          100% seguro.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          5. Cambios a Esta Política
        </h2>
        <p className="mb-4">
          Podemos actualizar nuestra Política de Privacidad ocasionalmente. Te
          notificaremos sobre cualquier cambio mediante un aviso en nuestro
          sitio.
        </p>

        <h2 className="text-2xl font-semibold mb-4">6. Contacto</h2>
        <p>
          Si tienes preguntas sobre nuestra Política de Privacidad, por favor
          contáctanos a través de nuestro correo electrónico:
          soporte@juguetitos.com.
        </p>
      </div>
    </main>
  );
}

export default PrivacyPolicyPage;
