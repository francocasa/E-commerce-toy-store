import { useState, useEffect } from 'react';
import {
  agregarDescuento,
  modificarDescuento,
  eliminarDescuento,
  consultaDescuentosHabilitados,
  consultaDescuentosInhabilitados,
  habilitarDescuento,
  inhabilitarDescuento,
  checkIfDescriptionExists,
} from '../../services/discounts';
import Swal from 'sweetalert2';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function DashboardDiscounts() {
  const [discounts, setDiscounts] = useState([]); // Descuentos habilitados
  const [disabledDiscounts, setDisabledDiscounts] = useState([]); // Descuentos inhabilitados
  const [newDiscount, setNewDiscount] = useState({
    id: '',
    description: '',
    discount: 0, // Valor del descuento en porcentaje
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [enableModalIsOpen, setEnableModalIsOpen] = useState(false); // Modal para habilitar descuentos

  useEffect(() => {
    const fetchDiscounts = async () => {
      const token = localStorage.getItem('adminToken');

      if (!token) {
        // Si no hay token, redirigir al login
        window.location.href = '/loginAdm';
        return;
      }

      try {
        // Si el token está presente, realizar las consultas
        const fetchedDiscounts = await consultaDescuentosHabilitados();
        setDiscounts(fetchedDiscounts);

        const fetchedDisabledDiscounts =
          await consultaDescuentosInhabilitados();
        setDisabledDiscounts(fetchedDisabledDiscounts);
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

    fetchDiscounts();
  }, []);

  const handleAddOrEditDiscount = async () => {
    // Verificar si la descripción ha cambiado (solo si es un descuento con ID)
    const isDescriptionChanged = newDiscount.id
      ? newDiscount.description !==
        discounts.find((d) => d.id === newDiscount.id)?.description
      : false; // Solo verificar si hay un ID y si la descripción ha cambiado

    // Validar la descripción solo si ha cambiado o si es un nuevo descuento
    if (
      ((newDiscount.id && isDescriptionChanged) || !newDiscount.id) &&
      newDiscount.description.length <= 5
    ) {
      Swal.fire(
        'Error',
        'La descripción debe tener más de 5 caracteres.',
        'error',
      );
      return; // Detener el proceso si la validación falla
    }

    // Verificar si la descripción ya existe solo si ha cambiado
    if (isDescriptionChanged) {
      const isDuplicate = await checkIfDescriptionExists(
        newDiscount.description,
      );
      if (isDuplicate) {
        Swal.fire(
          'Error',
          'Ya existe un descuento con esa descripción, puede estar habilitado o deshabilitado',
          'error',
        );
        return; // Detener el proceso si ya existe
      }
    }

    const discountValue = Number(newDiscount.discount); // Convierte a número

    if (isNaN(discountValue)) {
      Swal.fire(
        'Error',
        'El valor del descuento debe ser un número válido.',
        'error',
      );
      return;
    }

    // Ajustar el descuento como número (porcentaje)
    const adjustedDiscount = discountValue / 100; // Convertir porcentaje a decimal

    const discountToSubmit = {
      ...newDiscount,
      discount: adjustedDiscount,
    };

    try {
      // Comprobar si tiene ID para editar o crear
      if (newDiscount.id) {
        // Modificar descuento
        const updatedDiscount = await modificarDescuento(
          newDiscount.id,
          discountToSubmit,
        );

        // Actualizar los descuentos en la interfaz
        setDiscounts((prevDiscounts) =>
          prevDiscounts.map((discount) =>
            discount.id === newDiscount.id ? updatedDiscount : discount,
          ),
        );

        Swal.fire('Éxito', 'Descuento actualizado correctamente.', 'success');
      } else {
        // Agregar nuevo descuento
        const response = await agregarDescuento(discountToSubmit);
        if (response && response.data) {
          const addedDiscount = response.data; // Asignamos el descuento desde la respuesta
          setDiscounts((prevDiscounts) => [...prevDiscounts, addedDiscount]);

          Swal.fire('Éxito', 'Descuento agregado correctamente.', 'success');
        } else {
          window.location.reload();
        }
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

  const handleEdit = (discount) => {
    setNewDiscount({ ...discount, discount: discount.discount * 100 }); // Convertir el decimal a porcentaje para editar
    setModalIsOpen(true);
  };

  const handleDisable = async (id) => {
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
        // Llamar a la API para deshabilitar el descuento
        await inhabilitarDescuento(id);

        // Actualizar los descuentos en la interfaz
        setDiscounts(discounts.filter((discount) => discount.id !== id)); // Eliminar del listado de habilitados
        const discountToDisable = discounts.find(
          (discount) => discount.id === id,
        ); // Buscar el descuento deshabilitado
        setDisabledDiscounts([...disabledDiscounts, discountToDisable]); // Agregar al listado de inhabilitados

        Swal.fire(
          'Deshabilitado!',
          'El descuento ha sido deshabilitado.',
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

  const handleEnableDiscount = async (id) => {
    const result = await Swal.fire({
      title: '¿Confirma habilitar?',
      text: '¡Esta acción reactivará el descuento!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Habilitar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        // Llamar a la API para habilitar el descuento
        const reactivatedDiscount = await habilitarDescuento(id);

        // Si la respuesta es exitosa, actualizar la interfaz
        setDiscounts([...discounts, reactivatedDiscount]);
        setDisabledDiscounts(
          disabledDiscounts.filter((discount) => discount.id !== id),
        );

        // Notificación de éxito
        Swal.fire('Habilitado!', 'El descuento ha sido habilitado.', 'success');
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
    setNewDiscount({ id: '', description: '', discount: 0 }); // Resetear formulario
    setModalIsOpen(false);
  };

  return (
    <main className="container max-w-6xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-bold mb-4">Descuentos</h2>

      {/* Botones para agregar descuento y habilitar descuentos */}
      <div className="flex mb-4">
        <button
          onClick={() => setModalIsOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded shadow mr-4"
        >
          Agregar Nuevo Descuento
        </button>
        <button
          onClick={() => setEnableModalIsOpen(true)}
          className="bg-green-500 text-white py-2 px-4 rounded shadow"
        >
          Habilitar Descuentos
        </button>
      </div>

      {/* Tabla de descuentos habilitados */}
      <table className="min-w-full border mb-6">
        <thead>
          <tr>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Descuento (%)</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {discounts
            .filter((discount) => discount && discount.description) // Aseguramos que no sea null ni undefined
            .sort((a, b) => a.description.localeCompare(b.description)) // Ordenamos por descripción
            .map((discount) => (
              <tr key={discount.id}>
                <td className="border p-2">{discount.description}</td>
                <td className="border p-2">
                  {(discount.discount * 100).toFixed(2)}%
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(discount)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded"
                  >
                    Modificar
                  </button>
                  {/* Botón para deshabilitar */}
                  <button
                    onClick={() => handleDisable(discount.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded ml-2"
                  >
                    Deshabilitar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal de habilitar descuentos */}
      <Modal
        isOpen={enableModalIsOpen}
        onRequestClose={() => setEnableModalIsOpen(false)}
      >
        <h3 className="text-xl mb-2 mt-10">Descuentos Inhabilitados</h3>
        <ul>
          {disabledDiscounts
            .filter((discount) => discount && discount.description) // Aseguramos que no sea null ni undefined
            .sort((a, b) => a.description.localeCompare(b.description)) // Ordenamos por descripción
            .map((discount) => (
              <li
                key={discount.id}
                className="mb-2 flex justify-between items-center"
              >
                <span>{discount.description}</span>
                <button
                  onClick={() => handleEnableDiscount(discount.id)}
                  className="bg-green-500 text-white py-1 px-2 rounded"
                >
                  Habilitar
                </button>
              </li>
            ))}
        </ul>
        <button
          onClick={() => setEnableModalIsOpen(false)}
          className="bg-gray-500 text-white py-2 px-4 rounded mt-4"
        >
          Cerrar
        </button>
      </Modal>

      {/* Modal para agregar/editar descuento */}
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
        <h3 className="text-xl mb-2 mt-10">
          {newDiscount.id ? 'Editar Descuento' : 'Agregar Nuevo Descuento'}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Descripción"
            value={newDiscount.description}
            onChange={(e) =>
              setNewDiscount({ ...newDiscount, description: e.target.value })
            }
            className="border p-2 rounded"
          />
          <div className="flex items-center">
            <input
              type="number"
              placeholder="Descuento (%)"
              value={newDiscount.discount || ''}
              onChange={(e) =>
                setNewDiscount({ ...newDiscount, discount: e.target.value })
              }
              className="border p-2 rounded w-1/2"
              min="0"
            />
            <span className="ml-2">%</span>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handleAddOrEditDiscount}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {newDiscount.id ? 'Actualizar Descuento' : 'Agregar Descuento'}
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

export default DashboardDiscounts;
