import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-blue-50 py-6 px-4 lg:py-12 text-gray-800 relative">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between gap-6 lg:py-4 lg:p-4">
        {' '}
        {/* Agregado p-4 para márgenes */}
        <div className="flex w-full sm:w-1/2 gap-3">
          <div className="px-3 w-1/2">
            <img
              src="/logo-juguetitos.png"
              alt="Toys Logo"
              className="md:w-40"
            />
          </div>
          <ul className="list-none space-y-1 md:space-y-4">
            <li>
              <Link
                to={`/aboutus`}
                className="cursor-pointer hover:text-gray-500 text-base"
              >
                Quiénes somos
              </Link>
            </li>
            <li>
              <Link
                to={`/politica`}
                className="cursor-pointer hover:text-gray-500 text-base"
              >
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link
                to={`/faq`}
                className="cursor-pointer hover:text-gray-500 text-base"
              >
                Preguntas y respuestas
              </Link>
            </li>
          </ul>
        </div>
        <hr className="border-y-[1px] mx-3 block md:hidden" />
        <div className="px-3 w-full md:w-1/2">
          <p className="font-bold mb-1">Hable con nosotros</p>
          <form>
            <input
              type="text"
              placeholder="Nombre"
              className="border p-1 w-full mb-2 text-sm"
            />
            <textarea
              rows={3}
              placeholder="Escribe tu mensaje..."
              className="border p-1 w-full mb-2 text-sm"
            ></textarea>
            <input
              type="submit"
              value="Enviar mensaje"
              className="bg-blue-500 text-white py-2 px-3 text-sm"
            />
          </form>
        </div>
      </div>

      {/* Icono de WhatsApp flotante */}
      <a
        href="https://wa.me/51940467555"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        style={{ zIndex: 1000 }}
      >
        <FaWhatsapp size={42} />
      </a>
    </footer>
  );
}
