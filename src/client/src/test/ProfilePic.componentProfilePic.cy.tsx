import React from 'react';
import ProfilePic from '../components/ProfilePic.component';
import { dummy_profile_pic_path } from '../../cypress/fixtures/dummyUser';

describe('<ProfilePic />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProfilePic path={'./cypress/fixtures/Profile.png'} />);
  });

  beforeEach(() => {
    cy.mount(<ProfilePic path={'./cypress/fixtures/Profile.png'} />);
  });

  it('should render a profile picture', () => {
    cy.get('#profilePictureContainer').should('be.visible');
  });

  it('onHover, should render an edit menu', () => {
    cy.get('#profilePictureContainer').trigger('mouseover');
    cy.get('#edit').should('be.visible');
  });

  it('User should be able to upload his updated picture', () => {
    cy.get('#profilePictureContainer').trigger('mouseover');
    cy.get('#edit').selectFile('./cypress/fixtures/Profile.png');
  });
});
