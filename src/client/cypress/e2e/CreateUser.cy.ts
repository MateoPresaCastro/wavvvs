describe('login and create user leads to Home page', () => {
  it('connects', () => {
    cy.visit('http://localhost:3000/')
    if(localStorage.getItem('token')){
      cy.request({ 
        method : 'DELETE', 
          url: 'http://localhost:3001/user',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }})
        localStorage.removeItem('token')
        }
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('registers and logs in.', () => {
    cy.contains('button', 'Register').click()
    cy.get('#username').type('dummyUser')
    cy.get('#email').type('dummyUser@gmail.com')
    cy.get('#password').type('dummyUser')
    cy.contains('button', 'Register').click()

    cy.contains('button', 'Login')
    cy.get('#email').type('dummyUser@gmail.com')
    cy.get('#password').type('dummyUser')
    cy.contains('button', 'Login').click()

    cy.get('#name').type('dummyName')
    cy.get('#bio').type('I am a dummy user and I am very good at testing')
    cy.get('label#upload-button').selectFile('./cypress/fixtures/Profile.png')

    cy.wait(500)

    cy.contains('button', 'ADD INFO').click()

    cy.wait(3000)

  })

  it('user is redirected correctly to the home page and the profile picture should render correctly on the header' , () => {
    cy.contains('button', 'Login').click()
    cy.get('#email').type('dummyUser@gmail.com')
    cy.get('#password').type('dummyUser')
    cy.contains('button', 'Login').click()

    cy.get('#user-profile-pic').should(($img) => {
      expect($img.attr('src')).to.include('http://res.cloudinary.com')
    })
  
  })

  it('when clicking on the user picture in the header, the user should be redirected to the profile page', () => {
    cy.contains('button', 'Login').click()
    cy.get('#email').type('dummyUser@gmail.com')
    cy.get('#password').type('dummyUser')
    cy.contains('button', 'Login').click()

    cy.wait(1000)

    cy.get('img').click()
    cy.url().should('include', '/profile')
  })

})

describe('Login should be protected from any user not registered and register from any existing user in the db', () => {

  afterEach(() => {
    cy.visit('http://localhost:3000/')
      if(localStorage.getItem('token')){
      cy.request({ 
        method : 'DELETE', 
          url: 'http://localhost:3001/user',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }})
        localStorage.removeItem('token')
        }
    })

    it('should not be able to register with an existing user', () => {
      cy.visit('http://localhost:3000/')
      cy.contains('button', 'Register').click()
      cy.get('#username').type('dummyUser')
      cy.get('#email').type('dummyUser@gmail.com')
      cy.get('#password').type('dummyUser')
      cy.contains('button', 'Register').click()
      // Check for alert message
      cy.on('window:alert', (str) => {
        expect(str).to.equal('User already exists')
      })
      cy.contains('button', 'Login').should('have.class', 'hidden')

    })
    
    it('should not be able to login with a user that is not registered', () => {
      cy.visit('http://localhost:3000/')
      cy.contains('button', 'Login').click()
      cy.get('#email').type('dummyUser@gmail.com')
      cy.get('#password').type('dummyUser')
      cy.contains('button', 'Login').click()
      // Check for alert message
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Invalid username or password')
      })
    })


  })