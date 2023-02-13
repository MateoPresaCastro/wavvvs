import React from 'react';
import UserForm from '../components/UserForm.component';
import { newdummyUser } from '../../cypress/fixtures/dummyUser';
import {
  CurrentUserContext,
  IsAuthContext,
  IsNewUserContext,
} from './TestContext';

describe('<UserForm />', () => {
  it('renders', () => {
    cy.mount(
      <IsNewUserContext.Provider
        value={{
          isNewUser: false,
          setIsNewUser: () => {},
        }}
      >
        <IsAuthContext.Provider
          value={{
            isAuth: false,
            setIsAuth: () => {},
          }}
        >
          <CurrentUserContext.Provider
            value={{
              currentUser: newdummyUser,
              setCurrentUser: () => {},
            }}
          >
            <UserForm />
          </CurrentUserContext.Provider>
        </IsAuthContext.Provider>
      </IsNewUserContext.Provider>
    );
  });

  beforeEach(() => {
    cy.mount(
      <IsNewUserContext.Provider
        value={{
          isNewUser: false,
          setIsNewUser: () => {},
        }}
      >
        <IsAuthContext.Provider
          value={{
            isAuth: false,
            setIsAuth: () => {},
          }}
        >
          <CurrentUserContext.Provider
            value={{
              currentUser: newdummyUser,
              setCurrentUser: () => {},
            }}
          >
            <UserForm />
          </CurrentUserContext.Provider>
        </IsAuthContext.Provider>
      </IsNewUserContext.Provider>
    );
  });

  it('Clicking each buttons hide the others', () => {
    // Check that Go Back is hidden
    cy.get('button').contains('Go back').should('have.class', 'hidden');
    cy.get('form').should('have.class', 'hidden');
    // Check clicking assigns the correct value to the clicked state
    cy.get('button').contains('Login').click();
    //check that the register button has the className hidden and the form doesn't have the className hidden
    cy.get('button').contains('Register').should('have.class', 'hidden');
    cy.get('form').should('not.have.class', 'hidden');
    // repeat for the other button
    cy.get('button').contains('Go back').click();
    cy.get('form').should('have.class', 'hidden');
    //check that the login button has the className hidden
    cy.get('button').contains('Register').click();
    cy.get('button').contains('Login').should('have.class', 'hidden');
    cy.get('form').should('not.have.class', 'hidden');
  });

  describe('Should have the basic functionalities in case all goes well for registration and login', () => {
    it('redirects to login on complete and correct input of the fields', () => {
      cy.contains('button', 'Register').click();
      cy.get('#username').type('dummyUser');
      cy.get('#email').type('dummyUser@gmail.com');
      cy.get('#password').type('dummyUser');
      cy.contains('button', 'Register').click();
      cy.get('#username').should('have.class', 'hidden');
    });

    it('redirects to newUser when login correctly', () => {
      cy.contains('button', 'login').click();
      cy.get('#email').type('dummyUser@gmail.com');
      cy.get('#password').type('dummyUser');
      cy.contains('button', 'login').click();
    });
  });

  describe('Should refuse wrong inputs in any fiels', () => {
    it('should refuse wrong username', () => {
      cy.contains('button', 'Register').click();
      cy.get('#username').type('x');
      cy.get('#email').type('dummyUser@gmail.com');
      cy.get('#password').type('dummyUser');
      cy.contains('button', 'Register').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal(
          'Username must be at least 3 characters long and contain only letters and numbers'
        );
      });
    });

    it('should refuse wrong email', () => {
      cy.contains('button', 'Register').click();
      cy.get('#username').type('dummyUser');
      cy.get('#email').type('dummyUser');
      cy.get('#password').type('dummyUser');
      cy.contains('button', 'Register').click();
      //check if the error message is displayed as a navigator alert
      cy.on('window:alert', (str) => {
        expect(str).to.equal(
          'Email must contain @ and contain only letters and numbers'
        );
      });
    });

    it('should refuse wrong password', () => {
      cy.contains('button', 'Register').click();
      cy.get('#username').type('dummyUser');
      cy.get('#email').type('dummyUser@gmail.com');
      cy.get('#password').type('dum');
      cy.contains('button', 'Register').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal(
          'Password must be at least 8 characters long and contain only letters and numbers'
        );
      });
    });
  });
});
