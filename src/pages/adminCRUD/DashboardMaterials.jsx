import { useState, useEffect } from 'react';
import {
  agregarMaterial,
  modificarMaterial,
  eliminarMaterial,
  consultaMateriales,
} from '../../services/materials';
import Swal from 'sweetalert2';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function DashboardMaterials() {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({
    id: '',
    name: '',
    description: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      const fetchedMaterials = await consultaMateriales();
      setMaterials(fetchedMaterials);
    };

    fetchMaterials();
  }, []);

  const handleAddOrEditMaterial = async () => {
    if (newMaterial.id) {
      const updatedMaterial = await modificarMaterial(
        newMaterial.id,
        newMaterial,
      );
      setMaterials(
        materials.map((material) =>
          material.id === newMaterial.id ? updatedMaterial : material,
        ),
      );
      Swal.fire('Éxito', 'Material actualizado correctamente.', 'success');
    } else {
      const addedMaterial = await agregarMaterial(newMaterial);
      setMaterials([...materials, addedMaterial]);
      Swal.fire('Éxito', 'Material agregado correctamente.', 'success');
    }

    handleCloseModal();
  };

  const handleEdit = (material) => {
    setNewMaterial(material);
    setModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Confirma eliminar?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      await eliminarMaterial(id);
      setMaterials(materials.filter((material) => material.id !== id));
      Swal.fire('Eliminado!', 'El material ha sido eliminado.', 'success');
    }
  };

  const handleCloseModal = () => {
    setNewMaterial({ id: '', name: '', description: '' });
    setModalIsOpen(false);
  };

  return (
    <main className="container max-w-6xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-bold mb-4">Materiales</h2>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded shadow mb-4"
      >
        Agregar Nuevo Material
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
          {materials.map((material) => (
            <tr key={material.id}>
              <td className="border p-2">{material.name}</td>
              <td className="border p-2">
                {material.description || 'Sin descripción'}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(material)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded"
                >
                  Modificar
                </button>
                <button
                  onClick={() => handleDelete(material.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded ml-2"
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
          {newMaterial.id ? 'Editar Material' : 'Agregar Nuevo Material'}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={newMaterial.name}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, name: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={newMaterial.description}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, description: e.target.value })
            }
            className="border p-2 rounded"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleAddOrEditMaterial}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {newMaterial.id ? 'Actualizar Material' : 'Agregar Material'}
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

export default DashboardMaterials;
