import { useState, useEffect } from 'react';
import {
  agregarCategoria,
  editarCategoria,
  eliminarCategoria,
  consultaCategoriaPorId,
  consultaCategories,
  actualizarImagenCategoria,
  desactivarCategoria,   // Importar la función desactivarCategoria
  consultaCategoriasInhabilitadas,  // Importar la función consultaCategoriasInhabilitadas
  habilitarCategoria,    // Importar la función habilitarCategoria
} from '../../services/categories';
import Swal from 'sweetalert2';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function DashboardCategories() {
  const [newCategory, setNewCategory] = useState({
    id: '',
    name: '',
    description: '',
    image: '', // Cambiado a cadena vacía
  });
  const [categories, setCategories] = useState([]);
  const [inactiveCategories, setInactiveCategories] = useState([]);  // Nueva variable para categorías inhabilitadas
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalEnableIsOpen, setModalEnableIsOpen] = useState(false); // Modal para habilitar categorías

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const fetchedCategories = await consultaCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  // Cargar categorías inhabilitadas cuando se abre el modal de habilitación
  const fetchInactiveCategories = async () => {
    const fetchedInactiveCategories = await consultaCategoriasInhabilitadas();
    setInactiveCategories(fetchedInactiveCategories);
  };

  // Función para desactivar una categoría
  const handleDeactivate = async (id) => {
    const result = await Swal.fire({
      title: '¿Confirma deshabilitar?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Desactivar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      const success = await desactivarCategoria(id);
      if (success) {
        setCategories(categories.filter((category) => category.id !== id));
        Swal.fire('Desactivada!', 'La categoría ha sido desactivada.', 'success');
      } else {
        Swal.fire('Error', 'No se pudo desactivar la categoría.', 'error');
      }
    }
  };

  // Función para habilitar una categoría
  const handleEnable = async (id) => {
    const result = await Swal.fire({
      title: '¿Confirma habilitar?',
      text: 'Esta acción reactivará la categoría.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Habilitar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      const success = await habilitarCategoria(id);
      if (success) {
        setInactiveCategories(inactiveCategories.filter((category) => category.id !== id));
        // También la agregamos a la lista de categorías activas
        const reactivatedCategory = await consultaCategoriaPorId(id);
        setCategories([...categories, reactivatedCategory]);
        Swal.fire('Habilitada!', 'La categoría ha sido habilitada.', 'success');
      } else {
        Swal.fire('Error', 'No se pudo habilitar la categoría.', 'error');
      }
    }
  };

  const handleEdit = async (category) => {
    const categoryDetails = await consultaCategoriaPorId(category.id);
    if (categoryDetails) {
      setNewCategory({
        id: categoryDetails.id,
        name: categoryDetails.name,
        description: categoryDetails.description || '',
        image: categoryDetails.image || '',
      });
    }
    setModalIsOpen(true);
  };

  const handleAddOrEditCategory = async () => {
    const categoryData = { ...newCategory };

    try {
      if (newCategory.id) {
        // Edición de categoría
        const updatedCategory = await editarCategoria(
          newCategory.id,
          categoryData
        );
        if (updatedCategory) {
          setCategories(
            categories.map((category) =>
              category.id === newCategory.id ? updatedCategory : category
            )
          );
          Swal.fire('Éxito', 'Categoría editada correctamente.', 'success');

          // Actualizar la imagen si se proporciona
          if (newCategory.image) {
            const updatedImage = await actualizarImagenCategoria(
              newCategory.id,
              newCategory.image
            );
            if (updatedImage) {
              setCategories(
                categories.map((category) =>
                  category.id === newCategory.id
                    ? { ...category, image: updatedImage.image }
                    : category
                )
              );
              Swal.fire(
                'Éxito',
                'Imagen actualizada correctamente.',
                'success'
              );
            }
          }
        }
      } else {
        // Adición de categoría
        const addedCategory = await agregarCategoria(categoryData);
        if (addedCategory) {
          setCategories([...categories, addedCategory]);
          Swal.fire('Éxito', 'Categoría agregada correctamente.', 'success');

          // Actualizar la imagen si se proporciona
          if (newCategory.image) {
            const updatedImage = await actualizarImagenCategoria(
              addedCategory.id,
              newCategory.image
            );
            if (updatedImage) {
              setCategories(
                categories.map((category) =>
                  category.id === addedCategory.id
                    ? { ...category, image: updatedImage.image }
                    : category
                )
              );
              Swal.fire(
                'Éxito',
                'Imagen actualizada correctamente.',
                'success'
              );
            }
          }
        }
      }
    } catch (error) {
      console.error('Error en la operación:', error);
      Swal.fire(
        'Error',
        'Ocurrió un problema al agregar/editar la categoría.',
        'error'
      );
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setNewCategory({ id: '', name: '', description: '', image: '' });
    setModalIsOpen(false);
  };

  const handleCloseEnableModal = () => {
    setModalEnableIsOpen(false);
  };

  return (
    <main className="container max-w-6xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-bold mb-4 ml-4">Categorías</h2>

      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded shadow mb-4"
      >
        Agregar Nueva Categoría
      </button>

      <button
        onClick={() => {
          fetchInactiveCategories();
          setModalEnableIsOpen(true);
        }}
        className="bg-green-500 text-white py-2 px-4 rounded shadow ml-2 mb-4"
      >
        Habilitar Categorías
      </button>

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">Item</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{category.name}</td>
              <td className="border p-2">
                {category.description || 'Sin descripción'}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded"
                >
                  Modificar
                </button>
                <button
                  onClick={() => handleDeactivate(category.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded ml-2"
                >
                  Deshabilitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para habilitar categorías */}
      <Modal isOpen={modalEnableIsOpen} onRequestClose={handleCloseEnableModal}>
        <h3 className="text-xl mb-2 mt-10">Categorías Inhabilitadas</h3>
        <ul className="space-y-4">
          {inactiveCategories.map((category) => (
            <li key={category.id} className="flex justify-between">
              <span>{category.name}</span>
              <button
                onClick={() => handleEnable(category.id)}
                className="bg-green-500 text-white py-1 px-2 rounded"
              >
                Habilitar
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={handleCloseEnableModal}
          className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
        >
          Cerrar
        </button>
      </Modal>

      {/* Modal de Agregar/Editar Categoría */}
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
        <h3 className="text-xl mb-2 mt-10">
          {newCategory.id ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Descripción de la categoría"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setNewCategory({ ...newCategory, image: e.target.files[0] }); // Guardar el archivo
              }
            }}
            className="border p-2 rounded"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleAddOrEditCategory}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {newCategory.id ? 'Actualizar Categoría' : 'Agregar Categoría'}
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

export default DashboardCategories;
