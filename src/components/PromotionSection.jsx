import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { consultaPromociones } from '../services/promotions'; // Importa la función de consulta

const PromotionSection = () => {
  const scrollRef = useRef(null); // Referencia al contenedor
  const navigate = useNavigate(); // Crea la instancia de navegación
  const [promotions, setPromotions] = useState([]); // Estado para las promociones

  useEffect(() => {
    const fetchPromotions = async () => {
      const data = await consultaPromociones(); // Usar la función del servicio
      setPromotions(data); // Guarda las promociones en el estado
    };

    fetchPromotions();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleViewPromotion = (id) => {
    navigate(`/detailsproduct/${id}`); // Redirige a la ruta deseada
  };

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">Promociones</h2>
        <a href="/promotions" className="text-blue-600 hover:underline">
          Ver todo &rarr;
        </a>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-scroll no-scrollbar p-2"
        >
          {/* Mapear las promociones */}
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="min-w-[200px] sm:min-w-[250px] md:min-w-[300px] bg-white shadow-md p-4 rounded-md"
            >
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg mt-2 font-medium">
                {promo.categoryPromo}
              </h3>
              <p className="text-gray-500">{promo.descriptionPromo}</p>
              <button
                onClick={() => handleViewPromotion(promo.id)} // Cambia a un botón
                className="text-blue-600 hover:underline"
              >
                Ver promoción
              </button>
            </div>
          ))}
        </div>

        {/* Controles para desplazamiento */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          {'<'}
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          {'>'}
        </button>
      </div>
    </section>
  );
};

export default PromotionSection;
