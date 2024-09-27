function ProductsPage() {
  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
              <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center flex">
                <img src="/Logo.png" alt="Juguetitos" className="w-36" />
              </h2>
              <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                Somos una empresa de venta de juguetes por medio de plataforma
                online, que inicio sus operaciones en el año 2024, nos encanta
                innovar con los mejores juguetes del mercado
              </p>
            </div>
            <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
              <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                Mision
              </h2>
              <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                Brindarle a nuestros clientes productos de calidad, que cumplan
                con altos estandares de seguridad, sean innovadores y puedan
                crear momentos los mejores de diversión sin preocupaciones.
              </p>
            </div>
            <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
              <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                Vision
              </h2>
              <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                Ser la empresa con mayores ventas de juguetes en el mercado
                peruano en los proximos 5 años.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductsPage;
