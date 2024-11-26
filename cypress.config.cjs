// cypress.config.cjs
const { defineConfig } = require('cypress');
require('dotenv').config(); // Para cargar las variables de entorno desde el archivo .env

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Frontend en localhost
    supportFile: 'cypress/support/e2e.js', // Ruta a tu archivo de soporte
    specPattern: 'cypress/e2e/**/*.{spec.js,cy.js}', // Asegúrate de que esté buscando archivos .spec.js
    env: {
      VITE_API_URL: process.env.VITE_API_URL, // Carga la URL del backend desde el .env
    },
  },
});
