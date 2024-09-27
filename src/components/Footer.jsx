import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="bg-blue-50 py-12 text-gray-800">
      <div className="w-3/4 mx-auto flex justify-center gap-6">
        <div className="flex w-1/2">
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
              <a href="#">Política de privacidad</a>
            </li>
            <li>
              <a href="#">Nuestras tiendas</a>
            </li>
            <li>
              <a href="#">Anuncie aquí</a>
            </li>
          </ul>
        </div>

        <div className="w-1/2">
          <p className="font-bold mb-1">Hable con nosotros</p>

          <form>
            <label
              htmlFor="nombre"
              className="mb-3 pt-4 px-4 relative block overflow-hidden border-b border-gray-300 bg-white shadow-sm focus-within:border-blue-600"
            >
              <input
                type="text"
                id="nombre"
                placeholder="Nombre"
                className="peer h-8 w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              />

              <span className="px-4 absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:pt-4">
                Nombre
              </span>
            </label>

            <label
              htmlFor="mensaje"
              className="pt-4 px-4 h-24 relative block overflow-hidden border-b border-gray-300 bg-white shadow-sm focus-within:border-blue-600"
            >
              <input
                type="text"
                id="mensaje"
                placeholder="Escribe tu mensaje"
                className="peer h-8 w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              />

              <span className="px-4 absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:pt-4">
                Escribe tu mensaje
              </span>
            </label>

            <input
              type="submit"
              value="Enviar mensaje"
              className="bg-blue-500 text-white py-3 px-5 mt-2"
            />
          </form>
        </div>
      </div>
    </footer>
  );
}
