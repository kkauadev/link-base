describe("login error test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Show error message when providing incorrect login data", () => {
    cy.get('[data-cy="login-username-input"]').type("wrong Username");
    cy.get('[data-cy="login-password-input"]').type("wrong Password");

    cy.get('[data-cy="login-submit-login-button"]').click();

    cy.get('[data-cy="login-submit-login-button"]')
      .contains("Entrar")
      .should("be.visible");
    cy.contains("Usuário ou senha incorretos").should("be.visible");
  });

  it("Show error message when not providing login data", () => {
    cy.get('[data-cy="login-username-input"]').type("wrongUsername");

    cy.get('[data-cy="login-submit-login-button"]').click();

    cy.contains("Preencha todos os campos").should("be.visible");
  });

  it("Show password on click checkbox", () => {
    cy.get('[data-cy="login-password-input"]').type("wrongPassword");
    cy.get('[data-cy="login-password-input"]').should(
      "have.attr",
      "type",
      "password"
    );

    cy.get('[data-cy="login-show-password-checkbox"]').click();

    cy.get('[data-cy="login-password-input"]').should(
      "have.attr",
      "type",
      "text"
    );
  });
});
