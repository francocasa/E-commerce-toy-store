import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { consultaPromociones } from '../services/products'; // Importa la función de consulta

const PromotionSection = () => {
  const scrollRef = useRef(null); // Referencia al contenedor
  const navigate = useNavigate(); // Crea la instancia de navegación
  const [promotions, setPromotions] = useState([]); // Estado para las promociones

  useEffect(() => {
    const fetchPromotions = async () => {
      const data = await consultaPromociones(); // Usar la función del servicio
      console.log('Promociones:', data); // Verificar la salida
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
              className="min-w-[200px] sm:min-w-[250px] md:min-w-[300px] bg-white shadow-md p-4 rounded-md mx-auto"
            >
              <img
                src={promo.image[0]?.url} // Accede al primer elemento del array de imágenes
                alt={promo.name}
                className="w-auto h-40 object-cover rounded-md mx-auto"
              />
              <h3 className="text-lg mt-2 font-medium text-center">
                {promo.name} {/* Mostrar el nombre del producto */}
              </h3>
              <p className="text-gray-500 text-center">{promo.description}</p>{' '}
              {/* Mostrar la descripción */}
              <button
                onClick={() => handleViewPromotion(promo.id)} // Cambia a un botón
                className="text-blue-600 hover:underline block mx-auto"
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
