import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-blue-50 py-12 text-gray-800 relative">
      <div className="w-full sm:w-3/4 mx-auto flex flex-col sm:flex-row justify-between gap-6 p-4">
        {' '}
        {/* Agregado p-4 para márgenes */}
        <div className="flex w-full sm:w-1/2">
          <div className="w-1/2">
            <img src="/logo-juguetitos.png" alt="Toys Logo" className="w-3/5" />
          </div>
          <ul className="list-none space-y-4">
            <li>
              <Link to={`/aboutus`}>
                <a href="#">Quiénes somos</a>
              </Link>
            </li>
            <li>
              <Link to={`/politica`}>
                <a href="#">Política de privacidad</a>
              </Link>
            </li>
            <li>
              <Link to={`/faq`}>
                <a href="#">Preguntas y respuestas</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2">
          <p className="font-bold mb-1">Hable con nosotros</p>
          <form>
            <input
              type="text"
              placeholder="Nombre"
              className="border p-2 w-full mb-4"
            />
            <input
              type="text"
              placeholder="Escribe tu mensaje"
              className="border p-2 w-full mb-4"
            />
            <input
              type="submit"
              value="Enviar mensaje"
              className="bg-blue-500 text-white py-3 px-5 mt-2"
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
