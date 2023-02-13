import React from 'react';
import Profile from '../components/Profile.component';
import { newdummyUser } from '../../cypress/fixtures/dummyUser';
import { CurrentUserContext, playContext } from './TestContext';

describe('<Profile />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <playContext.Provider value={{ playOrPauseTrackByID: () => {} }}>
      <CurrentUserContext.Provider
        value={{
          currentUser: newdummyUser,
          setCurrentUser: () => {},
        }}
      >
        <Profile />
      </CurrentUserContext.Provider>
      </playContext.Provider>
    );
  });

  beforeEach(() => {
    cy.mount(
      <playContext.Provider value={{ playOrPauseTrackByID: () => {} }}>
      <CurrentUserContext.Provider
        value={{
          currentUser: newdummyUser,
          setCurrentUser: () => {},
        }}
      >
        <Profile />
      </CurrentUserContext.Provider>
      </playContext.Provider>
    );
  });

  it('renders the user profile pic', () => {
    cy.get('img').should('have.attr', 'src', 'https://i.imgur.com/1Q9ZQ9r.jpg');
  });

  it('renders the username', () => {
    cy.get('#username').should('have.text', '@dummyUser');
  });

  it("renders the user's name", () => {
    cy.get('h1').should('have.text', 'John Doe');
  });

  it('renders the user bio', () => {
    cy.get('#bio').should('have.text', 'I am a dummy user');
  });

  it('renders the user tracks', () => {
    // TODO : add tracks to Profile component
  });
});
