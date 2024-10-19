import { useState, useEffect } from 'react';
import {
  agregarMarca,
  editarMarca,
  eliminarMarca,
  consultaMarcas,
  consultaMarcaPorId,
} from '../../services/brands'; // Asegúrate de tener esta función en el servicio
import Swal from 'sweetalert2';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function DashboardBrands() {
  const [newBrand, setNewBrand] = useState({
    id: '',
    name: '',
    description: '',
  });
  const [brands, setBrands] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      try {
        const fetchedBrands = await consultaMarcas();
        setBrands(fetchedBrands);
      } catch (error) {
        Swal.fire('Error', 'No se pudieron cargar las marcas.', 'error');
      }
    };

    fetchBrands();
  }, []);

  const handleEdit = async (brand) => {
    const brandDetails = await consultaMarcaPorId(brand.id); // Asegúrate de tener esta función
    if (brandDetails) {
      setNewBrand({
        id: brandDetails.id,
        name: brandDetails.name,
        description: brandDetails.description || '',
      });
      setModalIsOpen(true);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Confirma eliminar?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      try {
        await eliminarMarca(id);
        setBrands(brands.filter((brand) => brand.id !== id));
        Swal.fire('Eliminado!', 'La marca ha sido eliminada.', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar la marca.', 'error');
      }
    }
  };

  const handleAddOrEditBrand = async () => {
    const brandData = { ...newBrand };

    try {
      if (newBrand.id) {
        const updatedBrand = await editarMarca(newBrand.id, brandData);
        setBrands(
          brands.map((brand) =>
            brand.id === newBrand.id ? updatedBrand : brand,
          ),
        );
        Swal.fire('Éxito', 'Marca actualizada correctamente.', 'success');
      } else {
        const addedBrand = await agregarMarca(brandData);
        setBrands([...brands, addedBrand]);
        Swal.fire('Éxito', 'Marca agregada correctamente.', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'No se pudo agregar/editar la marca.', 'error');
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setNewBrand({ id: '', name: '', description: '' });
    setModalIsOpen(false);
  };

  return (
    <main className="container max-w-6xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-bold mb-4">Marcas</h2>

      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded shadow mb-4"
      >
        Agregar Nueva Marca
      </button>

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id}>
              <td className="border p-2">{brand.name}</td>
              <td className="border p-2">
                {brand.description || 'Sin descripción'}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(brand)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                >
                  Modificar
                </button>
                <button
                  onClick={() => handleDelete(brand.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
        <h3 className="text-xl mb-2 mt-10">
          {newBrand.id ? 'Editar Marca' : 'Agregar Nueva Marca'}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={newBrand.name}
            onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={newBrand.description}
            onChange={(e) =>
              setNewBrand({ ...newBrand, description: e.target.value })
            }
            className="border p-2 rounded"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleAddOrEditBrand}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {newBrand.id ? 'Actualizar Marca' : 'Agregar Marca'}
          </button>
          <button
            onClick={handleCloseModal}
            className="ml-2 bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </main>
  );
}

export default DashboardBrands;
