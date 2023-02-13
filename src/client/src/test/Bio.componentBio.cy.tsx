import React from 'react';
import Bio from '../components/Bio.component';

describe('<Bio />', () => {
  it('renders', () => {
    cy.mount(<Bio bio="Hello World" />);
  });

  beforeEach(() => {
    cy.mount(<Bio bio="Hello World" />);
  });

  it('on Hover, should render an edit menu', () => {
    cy.get('section').trigger('mouseover');
    cy.get('#edit').should('be.visible');
  });

  it('on click change to edit mode and make p tag editable', () => {
    cy.get('section').trigger('mouseover');
    cy.get('#edit').click();
    cy.get('p').should('have.attr', 'contenteditable', 'true');
    cy.get('p').type('Hello World');
    cy.get('p').should('have.text', 'Hello WorldHello World');
  });

  it('on re-click change back to readonly', () => {
    cy.get('section').trigger('mouseover');
    cy.get('#edit').click();
    cy.get('#edit').click();
    cy.get('p').should('have.attr', 'contenteditable', 'false');
  });
});
