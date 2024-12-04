// cypress/support/commands.js
Cypress.Commands.add(
  'loginAdmin',
  (username = 'bubbl33s', password = 'Admin123_') => {
    cy.intercept('POST', `${Cypress.env('VITE_API_URL')}/admins/login`, {
      statusCode: 200,
      body: {
        admin: { username, name: 'Admin User' },
        token: 'mocked-token', // Este es el token simulado
      },
    }).as('loginRequest');

    // Simular el flujo de inicio de sesión
    cy.visit('/loginAdm');
    cy.get('input[placeholder="Nombre de Usuario"]').type(username);
    cy.get('input[placeholder="Contraseña"]').type(password);
    cy.get('button[type="submit"]').click();

    // Esperar la solicitud interceptada y guardar el token en localStorage
    cy.wait('@loginRequest').then(({ response }) => {
      const token = response.body.token;
      cy.window().then((window) => {
        window.localStorage.setItem('adminToken', token); // Guardar el token
      });
    });

    // Confirmar el modal de éxito
    cy.get('.swal2-confirm').click();
  },
);
