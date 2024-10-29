import { useState, useEffect } from 'react';
import {
  agregarDescuento,
  modificarDescuento,
  eliminarDescuento,
  consultaDescuentos,
} from '../../services/discounts';
import Swal from 'sweetalert2';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function DashboardDiscounts() {
  const [discounts, setDiscounts] = useState([]);
  const [newDiscount, setNewDiscount] = useState({
    id: '',
    description: '',
    discount: 0,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchDiscounts = async () => {
      const fetchedDiscounts = await consultaDescuentos();
      setDiscounts(fetchedDiscounts);
    };

    fetchDiscounts();
  }, []);

  const handleAddOrEditDiscount = async () => {
    const adjustedDiscount = newDiscount.discount / 100; // Ajustar a formato decimal
    const discountToSubmit = { ...newDiscount, discount: adjustedDiscount };

    if (newDiscount.id) {
      const updatedDiscount = await modificarDescuento(
        newDiscount.id,
        discountToSubmit,
      );
      setDiscounts(
        discounts.map((discount) =>
          discount.id === newDiscount.id ? updatedDiscount : discount,
        ),
      );
      Swal.fire('Éxito', 'Descuento actualizado correctamente.', 'success');
    } else {
      const addedDiscount = await agregarDescuento(discountToSubmit);
      setDiscounts([...discounts, addedDiscount]);
      Swal.fire('Éxito', 'Descuento agregado correctamente.', 'success');
    }

    handleCloseModal();
  };

  const handleEdit = (discount) => {
    setNewDiscount({ ...discount, discount: discount.discount * 100 }); // Convertir a porcentaje
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
      await eliminarDescuento(id);
      setDiscounts(discounts.filter((discount) => discount.id !== id));
      Swal.fire('Eliminado!', 'El descuento ha sido eliminado.', 'success');
    }
  };

  const handleCloseModal = () => {
    setNewDiscount({ id: '', description: '', discount: 0 });
    setModalIsOpen(false);
  };

  return (
    <main className="container max-w-6xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-bold mb-4">Descuentos</h2>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded shadow mb-4"
      >
        Agregar Nuevo Descuento
      </button>

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Descuento (%)</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map((discount) => (
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
                <button
                  onClick={() => handleDelete(discount.id)}
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
              value={newDiscount.discount || ''} // Asegúrate de que sea una cadena vacía si no hay valor
              onChange={(e) =>
                setNewDiscount({ ...newDiscount, discount: e.target.value })
              } // Mantén el valor como cadena
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
