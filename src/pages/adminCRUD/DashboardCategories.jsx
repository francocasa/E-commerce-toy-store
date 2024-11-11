import { useState, useEffect } from 'react';
import {
  agregarCategoria,
  editarCategoria,
  eliminarCategoria,
  consultaCategoriaPorId,
  consultaCategories,
  actualizarImagenCategoria,
  desactivarCategoria, // Importar la función desactivarCategoria
  consultaCategoriasInhabilitadas, // Importar la función consultaCategoriasInhabilitadas
  habilitarCategoria, // Importar la función habilitarCategoria
  checkIfNameExists,
} from '../../services/categories';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
const apiUrl = import.meta.env.VITE_IMAGES_URL;

Modal.setAppElement('#root');

function DashboardCategories() {
  const [newCategory, setNewCategory] = useState({
    id: '',
    name: '',
    description: '',
    image: '', // Cambiado a cadena vacía
  });
  const [categories, setCategories] = useState([]);
  const [inactiveCategories, setInactiveCategories] = useState([]); // Nueva variable para categorías inhabilitadas
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalEnableIsOpen, setModalEnableIsOpen] = useState(false); // Modal para habilitar categorías

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        window.location.href = '/loginAdm';
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
        const success = await desactivarCategoria(id);
        if (success) {
          // Actualizar el estado local eliminando la categoría desactivada
          setCategories(categories.filter((category) => category.id !== id));
          Swal.fire(
            'Desactivada!',
            'La categoría ha sido desactivada.',
            'success',
          );
        } else {
          Swal.fire('Error', 'No se pudo desactivar la categoría.', 'error');
        }
      } catch (error) {
        // Manejo de error si el token ha expirado (código 403)
        if (error.response && error.response.status === 403) {
          Swal.fire({
            icon: 'warning',
            title: 'Token Expirado',
            text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
          }).then(() => {
            localStorage.removeItem('adminToken'); // Eliminar el token expirado
            window.location.href = '/loginAdm'; // Redirigir al login
          });
        } else {
          // Manejo de otros errores
          console.error('Error al desactivar la categoría:', error);
          Swal.fire(
            'Error',
            'Ocurrió un problema al desactivar la categoría.',
            'error',
          );
        }
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
      try {
        const success = await habilitarCategoria(id);

        if (success) {
          // Eliminar la categoría de la lista de inactivas
          setInactiveCategories(
            inactiveCategories.filter((category) => category.id !== id),
          );

          // Consultar la categoría reactivada y agregarla a las categorías activas
          const reactivatedCategory = await consultaCategoriaPorId(id);
          setCategories([...categories, reactivatedCategory]);

          // Notificación de éxito
          Swal.fire(
            'Habilitada!',
            'La categoría ha sido habilitada.',
            'success',
          );
        } else {
          Swal.fire('Error', 'No se pudo habilitar la categoría.', 'error');
        }
      } catch (error) {
        // Manejo del error si el token ha expirado (código 403)
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
          console.error('Error al habilitar la categoría:', error);
          Swal.fire(
            'Error',
            'Hubo un error al habilitar la categoría.',
            'error',
          );
        }
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
    // Verificar si el nombre ya existe solo si el nombre ha cambiado (y no si solo se está modificando la imagen)
    const isNameChanged =
      newCategory.name !==
      (newCategory.id
        ? categories.find((c) => c.id === newCategory.id).name
        : '');
    if (isNameChanged) {
      const isDuplicate = await checkIfNameExists(newCategory.name);
      if (isDuplicate) {
        Swal.fire(
          'Error',
          'Ya existe una categoría con ese nombre, puede estar habilitada o deshabilitada',
          'error',
        );
        return; // Detener el proceso si ya existe
      }
    }

    const categoryData = { ...newCategory };

    try {
      if (newCategory.id) {
        // Edición de categoría
        const updatedCategory = await editarCategoria(
          newCategory.id,
          categoryData,
        );
        if (updatedCategory) {
          // Actualizar la categoría en el estado sin recargar la página
          setCategories(
            categories.map((category) =>
              category.id === newCategory.id ? updatedCategory : category,
            ),
          );
          Swal.fire('Éxito', 'Categoría editada correctamente.', 'success');

          // Actualizar la imagen si se proporciona una nueva
          if (newCategory.image instanceof File) {
            // Verificamos si es una nueva imagen
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
            }
          }
        }
      } else {
        // Adición de categoría
        const addedCategory = await agregarCategoria(categoryData);
        if (addedCategory) {
          // Actualizar el estado con la nueva categoría sin recargar la página
          setCategories((prevCategories) => [...prevCategories, addedCategory]);
          Swal.fire('Éxito', 'Categoría agregada correctamente.', 'success');

          // Actualizar la imagen si se proporciona
          if (newCategory.image instanceof File) {
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
            }
          }
        }
      }
    } catch (error) {
      // Manejo de error si el token ha expirado
      if (error.response && error.response.status === 403) {
        Swal.fire({
          icon: 'warning',
          title: 'Token Expirado',
          text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
        }).then(() => {
          localStorage.removeItem('adminToken'); // Eliminar el token expirado
          window.location.href = '/loginAdm'; // Redirigir al login
        });
      } else {
        // Manejo de otros posibles errores
        console.error('Error en la operación:', error);
        Swal.fire(
          'Error',
          'Ocurrió un problema al agregar/editar la categoría.',
          'error',
        );
      }
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
          {categories
            .sort((a, b) => a.name.localeCompare(b.name)) // Ordena por el atributo "name" de A a Z
            .map((category, index) => (
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
          {inactiveCategories
            .sort((a, b) => a.name.localeCompare(b.name)) // Ordena por el atributo "name" de A a Z
            .map((category) => (
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

          {/* Campo para mostrar la imagen existente o cargar una nueva */}
          <div className="col-span-2">
            {newCategory.image ? (
              <div>
                <p className="text-sm mb-2">Imagen actual:</p>

                <img
                  src={
                    typeof newCategory.image === 'string' &&
                    newCategory.image.includes('uploads') // Verificamos si es una cadena y contiene 'uploads'
                      ? `${apiUrl}${newCategory.image}` // Concatenamos la URL base con la ruta de la imagen
                      : newCategory.image instanceof File // Verificamos si es un objeto de tipo File (cuando se carga una nueva imagen)
                        ? URL.createObjectURL(newCategory.image) // Usamos una URL temporal para el archivo cargado
                        : 'ruta/a/imagen/por/defecto.jpg' // Agrega una imagen por defecto en caso de que no haya imagen
                  }
                  alt="Imagen de categoría"
                  className="w-32 h-32 object-cover mb-2"
                />
              </div>
            ) : (
              <p className="text-sm mb-2">No hay imagen actual.</p>
            )}

            {/* Campo para subir nueva imagen */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setNewCategory({ ...newCategory, image: e.target.files[0] });
                }
              }}
              className="border p-2 rounded"
            />
          </div>
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
