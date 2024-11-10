import { useState, useEffect } from 'react';
import {
  agregarMaterial,
  modificarMaterial,
  eliminarMaterial,
  consultaMateriales,
  consultaMaterialesInhabilitados,
  habilitarMaterial,
  deshabilitarMaterial,
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
  const [modalHabilitarIsOpen, setModalHabilitarIsOpen] = useState(false);
  const [inhabilitados, setInhabilitados] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      const fetchedMaterials = await consultaMateriales();
      setMaterials(fetchedMaterials);
    };

    fetchMaterials();
  }, []);

  // Función para obtener materiales inhabilitados
  const fetchInhabilitados = async () => {
    const fetchedInhabilitados = await consultaMaterialesInhabilitados();
    setInhabilitados(fetchedInhabilitados);
    setModalHabilitarIsOpen(true); // Abrir modal de materiales inhabilitados
  };

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
      title: '¿Confirma deshabilitar?',
      text: '¡Esta acción la hará invisible en el listado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Deshabilitar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      await deshabilitarMaterial(id);
      setMaterials(materials.filter((material) => material.id !== id));
      Swal.fire(
        'Deshabilitado!',
        'El material ha sido deshabilitado.',
        'success',
      );
    }
  };

  const handleEnableMaterial = async (id) => {
    const result = await Swal.fire({
      title: '¿Confirma habilitar este material?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Habilitar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      const updatedMaterial = await habilitarMaterial(id);
      setMaterials([...materials, updatedMaterial]);
      setInhabilitados(inhabilitados.filter((material) => material.id !== id));
      Swal.fire('Habilitado!', 'El material ha sido habilitado.', 'success');
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
      <button
        onClick={fetchInhabilitados}
        className="bg-green-500 text-white py-2 px-4 rounded shadow ml-4 mb-4"
      >
        Habilitar Materiales
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
          {materials
            .sort((a, b) => a.name.localeCompare(b.name)) // Ordena por el atributo "name" de A a Z
            .map((material) => (
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
                    Deshabilitar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal para agregar o editar material */}
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

      {/* Modal para habilitar materiales */}
      <Modal
        isOpen={modalHabilitarIsOpen}
        onRequestClose={() => setModalHabilitarIsOpen(false)}
      >
        <h3 className="text-xl mb-2 mt-10">Materiales Inhabilitados</h3>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Descripción</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inhabilitados.map((material) => (
              <tr key={material.id}>
                <td className="border p-2">{material.name}</td>
                <td className="border p-2">
                  {material.description || 'Sin descripción'}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEnableMaterial(material.id)}
                    className="bg-green-500 text-white py-1 px-2 rounded"
                  >
                    Habilitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <button
            onClick={() => setModalHabilitarIsOpen(false)}
            className="ml-2 bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </main>
  );
}

export default DashboardMaterials;
