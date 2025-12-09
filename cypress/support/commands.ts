/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      setupAuth(): Chainable<void>;
      setupApiMocks(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('setupAuth', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('refreshToken', 'mock-refresh-token');
  });
  cy.setCookie('accessToken', 'mock-access-token');
});

Cypress.Commands.add('setupApiMocks', () => {
  cy.fixture('ingredients.json').then((ingredients) => {
    cy.intercept('GET', '**/api/ingredients', {
      body: { success: true, data: ingredients }
    }).as('getIngredients');
  });

  cy.intercept('GET', '**/api/auth/user', {
    fixture: 'user.json'
  }).as('getUser');

  cy.fixture('order.json').then((order) => {
    cy.intercept('POST', '**/api/orders', {
      body: order
    }).as('createOrder');
  });
});

export {};
