function AboutUs() {
  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-gray-900 text-4xl font-bold font-manrope mb-4">
            SOBRE NOSOTROS:
          </h2>
          <img src="/Logo.png" alt="Juguetitos" className="w-36 mb-4" />
          <p className="text-gray-500 text-base font-normal leading-relaxed text-center">
            Somos una empresa de venta de juguetes por medio de plataforma
            online, que inició sus operaciones en el año 2024, nos encanta
            innovar con los mejores juguetes del mercado.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex flex-col justify-start items-center">
            <h2 className="text-gray-900 text-4xl font-bold font-manrope mb-4">
              Misión
            </h2>
            <p className="text-gray-500 text-base font-normal leading-relaxed text-center">
              Brindarle a nuestros clientes productos de calidad, que cumplan
              con altos estándares de seguridad, sean innovadores y puedan crear
              momentos de diversión sin preocupaciones.
            </p>
          </div>

          <div className="flex flex-col justify-start items-center">
            <h2 className="text-gray-900 text-4xl font-bold font-manrope mb-4">
              Visión
            </h2>
            <p className="text-gray-500 text-base font-normal leading-relaxed text-center">
              Ser la empresa con mayores ventas de juguetes en el mercado
              peruano en los próximos 5 años.
            </p>
          </div>
        </div>

        {/* Mapa de ubicación */}
        <div className="mt-10">
          <h2 className="text-gray-900 text-4xl font-bold text-center mb-4">
            Ubicación
          </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124862.99014458203!2d-77.1201218727405!3d-12.045692306342744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7b2899da30d%3A0x356dfef71add3715!2sLEGO%20Store%20Jockey%20Plaza!5e0!3m2!1ses-419!2spe!4v1727743799228!5m2!1ses-419!2spe"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
