describe('OrangeHRM Login Feature', () => {
  
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',  {timeout: 10000});
  });

  it('TC_LOGIN_001 - Login with credentials valid', () => {
    cy.get('input[placeholder="Username"]').type('Admin'), {timeout: 10000};
    cy.get('input[placeholder="Password"]').type('admin123'), {timeout: 10000};
    cy.get('button[type="submit"]').click(), {timeout: 10000};

    cy.contains('Dashboard').should('be.visible'), {timeout: 10000};
  });

  it('TC_LOGIN_002 - Login with wrong password ', () => {
    cy.get('input[placeholder="Username"]').type('Admin'), {timeout: 10000};
    cy.get('input[placeholder="Password"]').type('admin'), {timeout: 10000};
    cy.get('button[type="submit"]').click(), {timeout: 10000};

    cy.contains('Invalid credentials').should('be.visible'), {timeout: 10000};
  });


    it('TC_LOGIN_003 - Login with wrong username ', () => {
    cy.get('input[placeholder="Username"]').type('admin12'), {timeout: 10000};
    cy.get('input[placeholder="Password"]').type('admin123'), {timeout: 10000};
    cy.get('button[type="submit"]').click(), {timeout: 10000};

    cy.contains('Invalid credentials').should('be.visible'), {timeout: 10000};
  });


  it('TC_LOGIN_004 - Login without input username and password', () => {
    cy.get('button[type="submit"]').click(), {timeout: 10000};

    cy.contains('Required').should('be.visible'), {timeout: 10000};
  });

   it('TC_LOGIN_005 - Refresh after failed login', () => {
    cy.get('button[type="submit"]').click(), {timeout: 10000};

    cy.contains('Required').should('be.visible'), {timeout: 10000};
    cy.reload()
  });

  it('TC_LOGIN_006 - Verify the Login button is enabled only when both fields are filled', () => {
    cy.get('input[placeholder="Password"]').type('admin123'), {timeout: 10000};
    cy.get('button[type="submit"]').click(), {timeout: 10000};

    cy.contains('Required').should('be.visible'), {timeout: 10000};
  });

 it('TC_LOGIN_007 - Verify login with space before username', () => {
    cy.get('input[placeholder="Username"]').type(' Admin'), {timeout: 10000};
    cy.get('input[placeholder="Password"]').type('admin123'), {timeout: 10000};
    cy.get('button[type="submit"]').click(), {timeout: 10000};

    cy.contains('Invalid credentials').should('be.visible'), {timeout: 10000};
  });
});