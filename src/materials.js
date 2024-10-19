// src/services/materials.js

export const consultaMateriales = async () => {
  const response = await fetch('/api/materials');
  return await response.json();
};

export const agregarMaterial = async (material) => {
  const response = await fetch('/api/materials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(material),
  });
  return await response.json();
};

export const eliminarMaterial = async (id) => {
  await fetch(`/api/materials/${id}`, { method: 'DELETE' });
};
