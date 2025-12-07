describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.setupApiMocks();
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
      win.localStorage.removeItem('accessToken');
    });

    cy.clearCookie('accessToken');
  });

  it('adds bun to constructor', () => {
    cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
    cy.get('[data-testid="ingredient-bun"]').first().click();
    cy.get('[data-testid="constructor-bun-top"]').should('exist');
    cy.get('[data-testid="constructor-bun-top"]').contains('Краторная булка N-200i').should('exist');
    cy.get('[data-testid="constructor-bun-bottom"]').should('exist');
    cy.get('[data-testid="constructor-bun-bottom"]').contains('Краторная булка N-200i').should('exist');
  });

  it('adds main ingredient to constructor', () => {
    cy.get('[data-testid="constructor-ingredients"]').find('li').should('have.length', 0);

    cy.get('[data-testid="ingredient-main"]').first().click();

    cy.get('[data-testid="constructor-ingredients"]').should('not.be.empty');
    cy.get('[data-testid="constructor-ingredients"]').contains('Биокотлета из марсианской Магнолии').should('exist');

    cy.get('[data-testid="constructor-ingredients"]').find('li').should('have.length', 1);
  });

  it('adds sauce ingredient to constructor', () => {

    cy.get('[data-testid="constructor-ingredients"]').find('li').should('have.length', 0);

    cy.get('[data-testid="ingredient-sauce"]').first().click();

    cy.get('[data-testid="constructor-ingredients"]').should('not.be.empty');
    cy.get('[data-testid="constructor-ingredients"]').contains('Соус Spicy-X').should('exist');

    cy.get('[data-testid="constructor-ingredients"]').find('li').should('have.length', 1);
  });

  it('opens and closes ingredient modal', () => {

    cy.get('[data-testid="ingredient-bun"]').first().click();

    cy.get('[data-testid="modal"]').as('modal');

    cy.get('@modal').should('be.visible');

    cy.get('@modal').contains('Краторная булка N-200i').should('exist');

    cy.get('@modal').contains('Калории, ккал').parent().should('contain', '420');
    cy.get('@modal').contains('Белки, г').parent().should('contain', '80');
    cy.get('@modal').contains('Жиры, г').parent().should('contain', '24');
    cy.get('@modal').contains('Углеводы, г').parent().should('contain', '53');

    cy.get('[data-testid="modal-close"]').click();
    cy.get('@modal').should('not.exist');
  });

  it('closes ingredient modal by clicking overlay', () => {
    cy.get('[data-testid="ingredient-bun"]').first().click();

    cy.get('[data-testid="modal"]').as('modal');
    cy.get('[data-testid="modal-overlay"]').as('overlay');
    
    cy.get('@modal').should('be.visible');
    cy.get('@overlay').click({ force: true });
    cy.get('@modal').should('not.exist');
  });

  it('opens modal with correct main ingredient data', () => {

    cy.get('[data-testid="ingredient-main"]').first().click();

    cy.get('[data-testid="modal"]').as('modal');

    cy.get('@modal').should('be.visible');

    cy.get('@modal').contains('Биокотлета из марсианской Магнолии').should('exist');

    cy.get('@modal').contains('Калории, ккал').parent().should('contain', '420');
    cy.get('@modal').contains('Белки, г').parent().should('contain', '30');
    cy.get('@modal').contains('Жиры, г').parent().should('contain', '20');
    cy.get('@modal').contains('Углеводы, г').parent().should('contain', '10');
  });
  it('creates order successfully', () => {
    cy.setupAuth();

    cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
    cy.get('[data-testid="constructor-ingredients"]').find('li').should('have.length', 0);

    cy.get('[data-testid="add-button-bun"]').first().find('button').click();
    cy.get('[data-testid="constructor-bun-top"]').as('bunTop');
    cy.get('@bunTop').contains('Краторная булка N-200i').should('exist');

    cy.get('[data-testid="add-button-main"]').first().find('button').click();
    cy.get('[data-testid="constructor-ingredients"]').as('ingredients');
    cy.get('@ingredients').contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.get('@ingredients').find('li').should('have.length', 1);

    cy.get('[data-testid="add-button-sauce"]').first().find('button').click();
    cy.get('@ingredients').contains('Соус Spicy-X').should('exist');
    cy.get('@ingredients').find('li').should('have.length', 2);

    cy.get('[data-testid="constructor-bun-bottom"]').as('bunBottom');
    cy.get('@bunBottom').contains('Краторная булка N-200i').should('exist');

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('[data-testid="modal"]').as('modal');
    cy.get('[data-testid="order-number"]').as('orderNumber');
    
    cy.get('@modal').should('be.visible');
    cy.get('@orderNumber').should('contain', '12345');

    cy.get('[data-testid="modal-close"]').click();

    cy.get('@bunTop', { timeout: 5000 }).should('not.exist');
    cy.get('@ingredients', { timeout: 5000 }).find('li').should('have.length', 0);
    cy.get('@bunBottom', { timeout: 5000 }).should('not.exist');
  });
});
