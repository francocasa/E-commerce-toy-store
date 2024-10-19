// src/services/brands.js

export const consultaMarcas = async () => {
  const response = await fetch('/api/brands');
  return await response.json();
};

export const agregarMarca = async (marca) => {
  const response = await fetch('/api/brands', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(marca),
  });
  return await response.json();
};

export const eliminarMarca = async (id) => {
  await fetch(`/api/brands/${id}`, { method: 'DELETE' });
};
