import React from 'react';
import CreateUser from './CreateUser';
import { IsNewUserContext } from '../test/TestContext';

describe('<CreateUser />', () => {
  it('renders', () => {
    cy.mount(
    <IsNewUserContext.Provider value={{isNewUser: false, setIsNewUser: () => {}}}>
    <CreateUser />
    </IsNewUserContext.Provider>
    );
  });

  beforeEach(() => {
    cy.mount(
      <IsNewUserContext.Provider value={{isNewUser: false, setIsNewUser: () => {}}}>
      <CreateUser />
      </IsNewUserContext.Provider>
    );
  });

  it('has a name input', () => {
    cy.get('input[name="name"]').should('exist');
  });

  it('has a bio textarea', () => {
    cy.get('textarea[name="bio"]').should('exist');
  });

  it('has a profile pic input', () => {
    cy.get('input[name="profile_pic_path"]').should('exist');
  });

  it('has a submit button that triggers the api service updateUser', () => {
    cy.get('button[type="submit"]').should('exist');
    cy.get('input[name="name"]').type('testName');
    cy.get('textarea[name="bio"]').type('testBio');
    cy.get('input[name="profile_pic_path"]').selectFile(
      './cypress/fixtures/Profile.png'
    );
    cy.get('#profilePictureContainer').should('have.css', 'background-image');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.intercept('PUT', 'http://localhost:3001/me');
  });

  it("doesn't submit if any of the fields is not filled", () => {
    cy.get('button[type="submit"]').should('exist');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    // cy.intercept('PUT', 'http://localhost:3001/me').then(
    //   (res) => {expect(res!.statusCode).to.equal(203)}
    // )
  });
});
