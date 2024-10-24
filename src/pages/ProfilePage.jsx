import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { updateUserProfile, updateUserImage } from '../services/users';
import { useCounter } from '@/components/counter/Context'; // Importa el contexto
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProfilePage() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { user, headers, setHeaders } = useCounter();

  useEffect(() => {
    if (user) {
      setName(user.fullName || '');
      setId(user.id);
      setProfileImage(user.profileImage || '');
      setAddress(user.address || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const updatedUser = {
      ...user,
      fullName: name,
      profileImage,
      address,
      phone,
    };
    try {
      await updateUserProfile(updatedUser, headers);
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
    setName(user.fullName);
    setProfileImage(user.profileImage);
    setAddress(user.address);
    setPhone(user.phone);
  };

  const handleHistory = () => {
    window.location.href = '/history/' + id;
  };

  const handleLogout = () => {
    setHeaders({});
    localStorage.removeItem('currentUserEmail');
    Swal.fire({
      title: 'Sesión Cerrada',
      text: 'Has cerrado sesión.',
      icon: 'info',
      confirmButtonText: 'Aceptar',
    });
    window.location.href = '/login';
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const newImage = await updateUserImage(id, formData, headers);
        setProfileImage(newImage);
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'No se pudo actualizar la imagen.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  };

  const handlePhotoClick = () => {
    document.getElementById('photoInput').click();
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
                className="border border-gray-300 p-4 rounded flex items-center justify-center mr-4 relative cursor-pointer"
                style={{ width: '100px', height: '100px' }}
                onClick={handlePhotoClick}
              >
                {profileImage ? (
                  <img
                    crossOrigin="anonymous"
                    src={`${BASE_URL}/${profileImage}`}
                    alt="Perfil"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400">👤</span>
                )}
                <input
                  id="photoInput"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
                <span className="absolute inset-0 bg-black bg-opacity-50 text-white text-center opacity-0 hover:opacity-100 transition-opacity">
                  Cambiar Foto
                </span>
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
