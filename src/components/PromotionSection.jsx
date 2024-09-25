import { useRef } from 'react';
import { promotions } from '../data/Promotions'; // Asegúrate de que la ruta sea correcta

const PromotionSection = () => {
  const scrollRef = useRef(null); // Referencia al contenedor

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' }); // Ajusta el valor de desplazamiento
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' }); // Ajusta el valor de desplazamiento
    }
  };

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">Promociones</h2>
        <a href="/PromotionsPage" className="text-blue-600 hover:underline">Ver todo &rarr;</a>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-scroll no-scrollbar"
        >
          {/* Mapear las promociones */}
          {promotions.map(promo => (
            <div key={promo.id} className="min-w-[200px] bg-white shadow-md p-4 rounded-md">
              <img src={promo.image} alt={promo.category} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-lg mt-2 font-medium">{promo.category}</h3>
              <p className="text-gray-500">{promo.description}</p>
              <a href="/promo-detail" className="text-blue-600 hover:underline">Ver promoción</a>
            </div>
          ))}
        </div>

        {/* Controles para desplazamiento */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          {"<"}
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          {">"}
        </button>
      </div>
    </section>
  );
};

export default PromotionSection;
