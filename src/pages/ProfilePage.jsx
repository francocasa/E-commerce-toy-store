import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { updateUserProfile } from '../services/users';
import { useCounter } from '../components/counter/Context';

function ProfilePage() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [photo, setPhoto] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { user, token, setAuthHeaders } = useCounter();

  useEffect(() => {
    if (user) {
      setName(user.fullName || ''); // Asegúrate de que coincida con el nuevo campo
      setId(user.id);
      setPhoto(user.photo || '');
      setAddress(user.address || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    user.fullName = name; // Cambia según el nuevo campo
    user.photo = photo;
    user.address = address;
    user.phone = phone;
    try {
      await updateUserProfile(user, token); // Asegúrate de que esta función esté adaptada
      Swal.fire({
        title: 'Éxito!',
        text: 'Datos actualizados correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'No se pudieron actualizar los datos.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(user.name);
    setPhoto(user.photo);
    setAddress(user.address);
    setPhone(user.phone);
  };

  const handleHistory = () => {
    window.location.href = '/history/' + id;
  };

  const handleLogout = () => {
    setAuthHeaders({});
    localStorage.removeItem('currentUserEmail');
    Swal.fire({
      title: 'Sesión Cerrada',
      text: 'Has cerrado sesión.',
      icon: 'info',
      confirmButtonText: 'Aceptar',
    });
    window.location.href = '/login';
  };

  return (
    <main className="my-8">
      <div className="container mx-auto">
        {user ? (
          <div className="bg-white p-6 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
            <p className="mb-4">
              <strong>Email:</strong> {user.email}
            </p>

            <div className="mb-4 flex">
              <div
                className="border border-gray-300 p-4 rounded flex items-center justify-center mr-4"
                style={{ width: '100px', height: '100px' }}
              >
                {photo ? (
                  <img
                    src={photo}
                    alt="Perfil"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400">👤</span>
                )}
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre de perfil"
                className={`border p-2 w-full mb-2 rounded ${isEditing ? '' : 'bg-gray-200 cursor-not-allowed'}`}
                disabled={!isEditing}
              />
            </div>

            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="URL de la foto"
              className={`border p-2 w-full mb-2 rounded ${isEditing ? '' : 'bg-gray-200 cursor-not-allowed'}`}
              disabled={!isEditing}
            />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Dirección"
              className={`border p-2 w-full mb-2 rounded ${isEditing ? '' : 'bg-gray-200 cursor-not-allowed'}`}
              disabled={!isEditing}
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Teléfono"
              className={`border p-2 w-full mb-4 rounded ${isEditing ? '' : 'bg-gray-200 cursor-not-allowed'}`}
              disabled={!isEditing}
            />

            <div className="flex justify-between">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
                  >
                    Cancelar Cambios
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEdit}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                  >
                    Modificar Datos
                  </button>
                  <button
                    onClick={handleHistory}
                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition"
                  >
                    Historial de compra
                  </button>
                </>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        ) : (
          <p>No hay usuario conectado.</p>
        )}
      </div>
    </main>
  );
}

export default ProfilePage;
