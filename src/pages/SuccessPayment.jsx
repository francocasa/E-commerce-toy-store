const SuccessPayment = () => {
  return (
    <main className="container mx-auto p-8 flex justify-center items-center">
      <section className="flex flex-col justify-center items-center">
        <p className="text-lg mb-3 text-center">
          Pago exitoso, consulta el estado de tu orden
        </p>

        <a
          // Crear pagina de ordenes y modificar de ser necesario
          href={'/orders'}
          className="text-sm sm:text-base mb-3 text-white bg-blue-500 py-2 px-4 sm:mb-0 sm:px-6  rounded-md hover:bg-blue-700 transition-all inline-block"
        >
          Ver órdenes
        </a>
      </section>
    </main>
  );
};

export default SuccessPayment;
