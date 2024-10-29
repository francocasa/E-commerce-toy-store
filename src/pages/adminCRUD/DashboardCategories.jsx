import { useState, useEffect } from 'react';
import {
  agregarCategoria,
  editarCategoria,
  eliminarCategoria,
  consultaCategoriaPorId,
  consultaCategories,
  actualizarImagenCategoria,
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
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
      const success = await eliminarCategoria(id);
      if (success) {
        setCategories(categories.filter((category) => category.id !== id));
        Swal.fire('Eliminado!', 'La categoría ha sido eliminada.', 'success');
      } else {
        Swal.fire('Error', 'No se pudo eliminar la categoría.', 'error');
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
          categoryData,
        );
        if (updatedCategory) {
          setCategories(
            categories.map((category) =>
              category.id === newCategory.id ? updatedCategory : category,
            ),
          );
          Swal.fire('Éxito', 'Categoría editada correctamente.', 'success');

          // Actualizar la imagen si se proporciona
          if (newCategory.image) {
            const updatedImage = await actualizarImagenCategoria(
              newCategory.id,
              newCategory.image,
            );
            if (updatedImage) {
              setCategories(
                categories.map((category) =>
                  category.id === newCategory.id
                    ? { ...category, image: updatedImage.image }
                    : category,
                ),
              );
              Swal.fire(
                'Éxito',
                'Imagen actualizada correctamente.',
                'success',
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
              newCategory.image,
            );
            if (updatedImage) {
              setCategories(
                categories.map((category) =>
                  category.id === addedCategory.id
                    ? { ...category, image: updatedImage.image }
                    : category,
                ),
              );
              Swal.fire(
                'Éxito',
                'Imagen actualizada correctamente.',
                'success',
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
        'error',
      );
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setNewCategory({ id: '', name: '', description: '', image: '' });
    setModalIsOpen(false);
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
                  onClick={() => handleDelete(category.id)}
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
