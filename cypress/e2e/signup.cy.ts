describe("sign-up error test", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("Show error message when not providing signup data", () => {
    cy.get('[data-cy="signup-password-input"]').type("wrongPassword");
    cy.get('[data-cy="signup-password-confirm-input"]').type("wrongPassword");

    cy.get('[data-cy="signup-submit-login-button"]').click();

    cy.contains("Preencha todos os campos").should("be.visible");
  });

  it("Show error message when not providing a password with at least 8 characters", () => {
    cy.get('[data-cy="signup-username-input"]').type("wrongUsername");
    cy.get('[data-cy="signup-password-input"]').type("small");
    cy.get('[data-cy="signup-password-confirm-input"]').type("small");

    cy.get('[data-cy="signup-submit-login-button"]').click();

    cy.contains("A senha deve conter no mínimo 8 caracteres").should(
      "be.visible"
    );
  });

  it("Show error message when the password and confirmation are different", () => {
    cy.get('[data-cy="signup-username-input"]').type("wrongUsername");
    cy.get('[data-cy="signup-password-input"]').type("wrongPassword");
    cy.get('[data-cy="signup-password-confirm-input"]').type("aaaa");

    cy.get('[data-cy="signup-submit-login-button"]').click();

    cy.contains("As senhas não coincidem").should("be.visible");
  });
});
