const HeroSection = () => {
  return (
    <section
      className="relative h-96 bg-cover bg-center flex flex-col justify-end items-start text-white"
      style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(/FondoHero.png)'
      }}
    >
      <div className="text-left ml-5 mb-5">
        <h1 className="text-4xl font-bold">Promociones que te esperan</h1>
        <p className="text-lg mt-4">Productos seleccionados con 33% de descuento</p>
        <a href="/PromotionsPage" className="mt-6 bg-blue-600 py-2 px-6 rounded-md text-white hover:bg-blue-700 transition-all inline-block">Ver Ofertas</a>
      </div>

      {/* Controles para el slider */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <button className="text-3xl text-white bg-black bg-opacity-50 p-2 rounded-full">{"<"}</button>
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        <button className="text-3xl text-white bg-black bg-opacity-50 p-2 rounded-full">{">"}</button>
      </div>

      {/* Indicadores del slider */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <span className="w-3 h-3 bg-white rounded-full"></span>
        <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
        <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
      </div>
    </section>
  );
};

export default HeroSection;
