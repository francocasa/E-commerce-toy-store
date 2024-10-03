const BASE_URL = import.meta.env.VITE_API_URL; // Obtener la URL base desde el .env

// Obtener el perfil del usuario
export const getUserProfile = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/users_cliente/${id}`);
    if (!response.ok) throw new Error('User not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Actualizar el perfil del usuario
export const updateUserProfile = async (updatedUser) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users_cliente/${updatedUser.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to update user profile');
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
};

// Autenticar al usuario
export const authenticateUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users_cliente?email=${email}`);
    const users = await response.json();
    const user = users.find((user) => user.password === password);
    return user ? user.id : null; // Devuelve el ID si se autentica
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};

export const getUserIdByEmail = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/users_cliente?email=${email}`);
    const users = await response.json();
    return users.length > 0 ? users[0].id : null; // Devuelve el ID si se encuentra
  } catch (error) {
    console.error('Error fetching user ID by email:', error);
    return null;
  }
};

export const createUser = async (user) => {
  try {
    // Generar un nuevo ID (asegúrate de que sea único)
    const newUser = {
      id: generateUniqueId(), // Implementa tu propia lógica para generar un ID único
      ...user, // Spread operator para incluir el resto de las propiedades
    };

    const response = await fetch(`${BASE_URL}/users_cliente`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    return await response.json(); // Devuelve el usuario creado
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Función para generar un ID único (puedes modificar esto según tus necesidades)
const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9); // Genera un ID aleatorio
};
