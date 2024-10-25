import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-blue-50 py-6 px-4 text-gray-800 relative">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-6 lg:py-4 lg:p-4 divide-y-2 md:divide-y-0">
        {' '}
        {/* Agregado p-4 para márgenes */}
        <div className="flex w-full md:w-1/2 gap-3">
          <div className="px-3 w-1/2">
            <img
              src="/logo-juguetitos.png"
              alt="Toys Logo"
              className="md:w-40 lg:w-48 md:block md:mx-auto"
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
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-3 w-full md:w-1/2">
          <p className="font-bold mt-3 mb-1 lg:mb-3 md:mt-0">
            Hable con nosotros
          </p>
          <form>
            <input
              type="text"
              placeholder="Nombre"
              className="border p-1 w-full mb-2 text-sm lg:text-base lg:mb-3 lg:p-2"
            />
            <textarea
              rows={3}
              placeholder="Escribe tu mensaje..."
              className="border p-1 w-full mb-2 text-sm lg:text-base lg:mb-3 lg:p-2"
            ></textarea>
            <input
              type="submit"
              value="Enviar mensaje"
              className="py-2 px-3 text-sm text-white border-2 border-blue-500 bg-blue-500 rounded-md font-bold hover:bg-blue-400 hover:border-blue-400 cursor-pointer transition-colors lg:text-base lg:px-4"
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
