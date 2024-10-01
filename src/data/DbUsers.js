// data/DbUsers.js

const usersKey = 'users'; // Clave para almacenar usuarios en localStorage
const admins = [
  { email: 'mikelyto@gmail.com', password: '1234', name: 'Mikelyto Pariona' },
  { email: 'miguel@gmail.com', password: '4481', name: 'Miguel Chavez' },
];

// Función para crear un nuevo usuario
const createUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem(usersKey)) || [];
  const newUser = {
    email,
    password,
    name: '',
    photo: '',
    address: '',
    phone: '',
    purchases: [],
  };
  users.push(newUser);
  localStorage.setItem(usersKey, JSON.stringify(users));
  return newUser;
};

// Función para autenticar usuario
const authenticateUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem(usersKey)) || [];
  return users.some(
    (user) => user.email === email && user.password === password,
  );
};

// Función para autenticar administrador
const authenticateAdmin = (email, password) => {
  const admin = admins.find((admin) => admin.email === email);
  if (admin && admin.password === password) {
    // Guardar email del admin en localStorage
    localStorage.setItem('AdminLogueado', admin.email);
    return true;
  }
  return false;
};

// Función para obtener el administrador logueado
const getLoggedAdmin = () => {
  const adminEmail = localStorage.getItem('AdminLogueado');
  return admins.find((admin) => admin.email === adminEmail) || null;
};

// Función para obtener usuarios
const getUsers = () => {
  return JSON.parse(localStorage.getItem(usersKey)) || [];
};

// Exportar funciones
export {
  createUser,
  authenticateUser,
  authenticateAdmin,
  getUsers,
  getLoggedAdmin,
};
