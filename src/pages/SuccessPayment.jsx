import { Link } from 'react-router-dom';
const SuccessPayment = () => {
  return (
    <main className="container mx-auto p-8 flex justify-center items-center">
      <section className="flex flex-col justify-center items-center">
        <p className="text-lg mb-3 text-center">
          Pago exitoso, consulta el estado de tu orden
        </p>

        <Link
          to={`/history`}
          className="text-sm sm:text-base mb-3 text-white bg-blue-500 py-2 px-4 sm:mb-0 sm:px-6  rounded-md hover:bg-blue-700 transition-all inline-block"
        >
          Ver órdenes
        </Link>
      </section>
    </main>
  );
};

export default SuccessPayment;
