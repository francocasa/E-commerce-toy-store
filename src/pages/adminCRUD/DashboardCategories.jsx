import { useState, useEffect } from 'react';
import {
  agregarCategoria,
  editarCategoria,
  eliminarCategoria,
  consultaCategoriaPorId,
  consultaCategories,
} from '../../services/categories';
import Swal from 'sweetalert2';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function DashboardCategories() {
  const [newCategory, setNewCategory] = useState({
    id: '',
    title: '',
    image: '',
  });
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchProductsAndBrands = async () => {
      const fetchedCategories = await consultaCategories();

      setCategories(fetchedCategories);
    };

    fetchProductsAndBrands();
  }, []);

  const handleDelete = async (id) => {
    console.log('ingreso1');
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
      console.log(success);
      let t = true;
      if (t) {
        setCategories(categories.filter((category) => category.id !== id));
        Swal.fire('Eliminado!', 'La categoria ha sido eliminado.', 'success');
      } else {
        Swal.fire('Error', 'No se pudo eliminar la categoria.', 'error');
      }
    }
  };

  const handleEdit = async (category) => {
    const categoryDetails = await consultaCategoriaPorId(category.id);
    if (categoryDetails) {
      setNewCategory(categoryDetails);
    }
    setModalIsOpen(true);
  };

  const handleAddOrEditCategory = async () => {
    const categoryData = {
      ...newCategory,
    };

    if (newCategory.id) {
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
        Swal.fire('Éxito', 'Categoria editado correctamente.', 'success');
      }
    } else {
      const addedCategory = await agregarCategoria(categoryData);
      if (addedCategory) {
        setCategories([...categories, addedCategory]);
        Swal.fire('Éxito', 'Categoria agregado correctamente.', 'success');
      }
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setNewCategory({
      id: '',
      title: '',
      image: '',
    });
    setModalIsOpen(false);
  };

  return (
    <main className="container max-w-6xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-bold mb-4 ml-4">Categorias</h2>

      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded shadow mb-4"
      >
        Agregar Nueva Categoria
      </button>

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">Item</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Imagen</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{category.title}</td>
              <td className="border p-2">{category.image}</td>
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
          {newCategory.id ? 'Editar Categoria' : 'Agregar Nueva Categoria'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre de la categoria"
            value={newCategory.title}
            onChange={(e) =>
              setNewCategory({ ...newCategory, title: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="URL de la imagen"
            value={newCategory.image || ''} // Manejar caso vacío
            onChange={(e) =>
              setNewCategory({
                ...newCategory,
                image: e.target.value,
              })
            }
            className="border p-2 rounded"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleAddOrEditCategory}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {newCategory.id ? 'Actualizar Categoria' : 'Agregar Categoria'}
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
