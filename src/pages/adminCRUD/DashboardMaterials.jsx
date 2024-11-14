import { useState, useEffect } from 'react';
import {
  agregarMaterial,
  modificarMaterial,
  eliminarMaterial,
  isNameDuplicated,
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
      const token = localStorage.getItem('adminToken');

      if (!token) {
        // Si no hay token, redirigir al login
        window.location.href = '/loginAdm';
        return;
      }

      try {
        // Si el token está presente, realizar las consultas
        const fetchedMaterials = await consultaMateriales();
        setMaterials(fetchedMaterials);
      } catch (error) {
        // Manejo de errores, por ejemplo si la API falla
        console.error('Error al cargar los descuentos:', error);
        Swal.fire(
          'Error',
          'Hubo un problema al cargar los descuentos.',
          'error',
        );
      }
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
    const materialData = { ...newMaterial };

    // Validar si el nombre del material ya existe en los materiales activos o inhabilitados
    if (
      isNameDuplicated(
        newMaterial.name,
        materials,
        inhabilitados,
        newMaterial.id,
      )
    ) {
      Swal.fire('Error', 'Ya existe un material con el mismo nombre.', 'error');
      return;
    }

    try {
      if (newMaterial.id) {
        // Si estamos editando un material, solo procedemos si el nombre cambió
        const updatedMaterial = await modificarMaterial(
          newMaterial.id,
          materialData,
        );
        setMaterials(
          materials.map((material) =>
            material.id === newMaterial.id ? updatedMaterial : material,
          ),
        );
        Swal.fire('Éxito', 'Material actualizado correctamente.', 'success');
      } else {
        // Si es un nuevo material, lo agregamos a la lista
        const addedMaterial = await agregarMaterial(materialData);
        setMaterials([...materials, addedMaterial]);
        Swal.fire('Éxito', 'Material agregado correctamente.', 'success');
      }
    } catch (error) {
      // Manejo de errores por expiración de token (código 403)
      if (error.response && error.response.status === 403) {
        Swal.fire({
          icon: 'warning',
          title: 'Token Expirado',
          text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
        }).then(() => {
          localStorage.removeItem('adminToken'); // Eliminar el token expirado
          window.location.href = '/loginAdm'; // Redirigir al login de administrador
        });
      } else {
        // Manejo de otros errores
        console.error('Error al agregar o editar descuento:', error);
        Swal.fire(
          'Error',
          'Hubo un problema al procesar la solicitud. Inténtalo de nuevo.',
          'error',
        );
      }
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
      try {
        await deshabilitarMaterial(id);
        setMaterials(materials.filter((material) => material.id !== id));
        Swal.fire(
          'Deshabilitado!',
          'El material ha sido deshabilitado.',
          'success',
        );
      } catch (error) {
        // Manejo de errores por expiración de token (código 403)
        if (error.response && error.response.status === 403) {
          Swal.fire({
            icon: 'warning',
            title: 'Token Expirado',
            text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
          }).then(() => {
            localStorage.removeItem('adminToken'); // Eliminar el token expirado
            window.location.href = '/loginAdm'; // Redirigir al login de administrador
          });
        } else {
          // Manejo de otros errores
          console.error('Error al deshabilitar el descuento:', error);
          Swal.fire(
            'Error',
            'Hubo un problema al deshabilitar el descuento. Inténtalo de nuevo.',
            'error',
          );
        }
      }
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
      try {
        const updatedMaterial = await habilitarMaterial(id);
        setMaterials([...materials, updatedMaterial]);
        setInhabilitados(
          inhabilitados.filter((material) => material.id !== id),
        );
        Swal.fire('Habilitado!', 'El material ha sido habilitado.', 'success');
      } catch (error) {
        // Manejo de errores por expiración del token (código 403)
        if (error.response && error.response.status === 403) {
          Swal.fire({
            icon: 'warning',
            title: 'Token Expirado',
            text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
          }).then(() => {
            localStorage.removeItem('adminToken'); // Eliminar el token expirado
            window.location.href = '/loginAdm'; // Redirigir al login de administrador
          });
        } else {
          // Manejo de otros errores
          console.error('Error al habilitar el descuento:', error);
          Swal.fire(
            'Error',
            'Hubo un problema al habilitar el descuento. Inténtalo de nuevo.',
            'error',
          );
        }
      }
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
            {inhabilitados
              .sort((a, b) => a.name.localeCompare(b.name)) // Ordena por el atributo "name" de A a Z
              .map((material) => (
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
