describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.setupApiMocks();
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('adds bun to constructor', () => {
    cy.get('[data-testid="ingredient-bun"]').first().click();
    cy.get('[data-testid="constructor-bun-top"]').should('exist');
    cy.get('[data-testid="constructor-bun-bottom"]').should('exist');
  });

  it('adds main ingredient to constructor', () => {
    cy.get('[data-testid="ingredient-main"]').first().click();
    cy.get('[data-testid="constructor-ingredients"]').should('not.be.empty');
  });

  it('adds sauce ingredient to constructor', () => {
    cy.get('[data-testid="ingredient-sauce"]').first().click();
    cy.get('[data-testid="constructor-ingredients"]').should('not.be.empty');
  });

  it('opens and closes ingredient modal', () => {
    cy.get('[data-testid="ingredient-bun"]').first().click();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('closes ingredient modal by clicking overlay', () => {
    cy.get('[data-testid="ingredient-bun"]').first().click();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });
  it('creates order successfully', () => {
    cy.setupAuth();

    cy.get('[data-testid="add-button-bun"]').first().find('button').click();
    cy.get('[data-testid="add-button-main"]').first().find('button').click();
    cy.get('[data-testid="add-button-sauce"]').first().find('button').click();

    cy.get('[data-testid="constructor-bun-top"]').should('exist');
    cy.get('[data-testid="constructor-ingredients"]').should('not.be.empty');
    cy.get('[data-testid="constructor-bun-bottom"]').should('exist');
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="order-number"]').should('contain', '12345');
    cy.get('[data-testid="modal-close"]').click();

    cy.get('[data-testid="constructor-bun-top"]', { timeout: 5000 }).should('not.exist');
    cy.get('[data-testid="constructor-ingredients"]', { timeout: 5000 })
      .find('li')
      .should('have.length', 0);
  });
});
