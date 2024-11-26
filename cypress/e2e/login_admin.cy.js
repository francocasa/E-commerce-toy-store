// cypress/e2e/login_admin.cy.js
describe('Login de Administrador', () => {
  it('Debe iniciar sesión correctamente con credenciales válidas', () => {
    cy.loginAdmin(); // Llama al comando personalizado

    // Verificar la redirección a /admin/dashboard
    cy.url().should('include', '/admin/dashboard');
  });

  it('Debe mostrar un error si las credenciales son incorrectas', () => {
    const username = 'uSerWrong';
    const password = 'wrongpassword';

    // Interceptar solicitud con error
    cy.intercept('POST', `${Cypress.env('VITE_API_URL')}/admins/login`, {
      statusCode: 400,
      body: { message: 'Credenciales incorrectas' },
    }).as('loginRequestError');

    // Visitar la página de login
    cy.visit('/loginAdm');

    // Completar el formulario con credenciales incorrectas
    cy.get('input[placeholder="Nombre de Usuario"]').type(username);
    cy.get('input[placeholder="Contraseña"]').type(password);
    cy.get('button[type="submit"]').click();

    // Validar error devuelto por el backend
    cy.wait('@loginRequestError').then((interception) => {
      expect(interception.response.statusCode).to.equal(400);
      expect(interception.response.body.message).to.equal('Credenciales incorrectas');
    });

    // Verificar que no se redirige
    cy.url().should('include', '/loginAdm');
  });
});
