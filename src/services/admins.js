const BASE_URL = import.meta.env.VITE_API_URL; // Define tu URL base

export const fetchAdminData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users_admin`);
    if (!response.ok) throw new Error('Failed to fetch admin data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return [];
  }
};

export const authenticateAdmin = async (email, password) => {
  const admins = await fetchAdminData();
  const admin = admins.find(
    (admin) => admin.email === email && admin.password === password,
  );

  if (admin) {
    localStorage.setItem('AdminLogueado', JSON.stringify(admin)); // Almacena el admin logueado
    return true;
  }

  return false;
};

export const getLoggedAdmin = () => {
  const admin = localStorage.getItem('AdminLogueado');
  return admin ? JSON.parse(admin) : null; // Devuelve el admin si está logueado
};
