import { useState, useEffect } from 'react';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import {
  getUserProfile,
  updateUserProfile,
  getUserIdByEmail,
} from '../services/userprofile';

function ProfilePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [photo, setPhoto] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const email = localStorage.getItem('currentUserEmail');
      const userId = await getUserIdByEmail(email);
      const user = await getUserProfile(userId);
      if (user) {
        setCurrentUser(user);
        setName(user.fullName || '');
        setId(userId);
        setPhoto(user.photo || '');
        setAddress(user.address || '');
        setPhone(user.phone || '');
      }
    };
    fetchUserProfile();
  }, []);

  const showToast = (title, text, type) => {
    Toastify({
      text: `${title}: ${text}`,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      backgroundColor: type === 'success' ? '#4CAF50' : '#FF9800',
      stopOnFocus: true,
      offset: {
        x: 20,
        y: 60,
      },
    }).showToast();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        fullName: name,
        photo,
        address,
        phone,
      };
      try {
        await updateUserProfile(updatedUser);
        showToast('Éxito!', 'Datos actualizados correctamente.', 'success');
        setIsEditing(false);
      } catch (error) {
        showToast(
          'Error!',
          error.message || 'No se pudieron actualizar los datos.',
          'error',
        );
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (currentUser) {
      setName(currentUser.fullName);
      setPhoto(currentUser.photo);
      setAddress(currentUser.address);
      setPhone(currentUser.phone);
    }
  };

  const handleHistory = () => {
    window.location.href = '/history/' + id;
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUserEmail');
    showToast('Sesión Cerrada', 'Has cerrado sesión.', 'info');
    window.location.href = '/login';
  };

  return (
    <main className="my-8">
      <div className="container mx-auto">
        {currentUser ? (
          <div className="bg-white p-6 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
            <p className="mb-4">
              <strong>Email:</strong> {currentUser.email}
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
