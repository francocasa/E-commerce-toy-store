const Searchbar = () => {
  return (
    <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md w-96">
      <input
        type="text"
        placeholder="¿Qué deseas buscar?"
        className="bg-transparent w-full outline-none text-gray-700"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default Searchbar;
