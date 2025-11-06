describe('Scenario verification login button', () => {
    it('TC_LOGIN_001 - Login with credentials valid', () => {
     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',  {timeout: 10000});

     cy.get('input[placeholder="Username"]').type('Admin'), {timeout: 10000};
     cy.get('input[placeholder="Password"]').type('admin123'), {timeout: 10000};
     cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary');
     cy.get('button[type="submit"]').click(), {timeout: 10000};

     cy.wait('@actionSummary').its('response.statusCode').should('eq',200), {timeout: 10000};
     cy.contains('Dashboard').should('be.visible'), {timeout: 10000};
  });

    it('TC_LOGIN_002 - Login with wrong password ', () => {
     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',  {timeout: 10000});
    
     cy.get('input[placeholder="Username"]').type('Admin'), {timeout: 10000};
     cy.get('input[placeholder="Password"]').type('admin'), {timeout: 10000};
     cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('authValidate');
     cy.get('button[type="submit"]').click(), {timeout: 10000};

     cy.wait('@authValidate').its('response.statusCode').should('be.eq',302), {timeout: 10000};
     cy.contains('Invalid credentials').should('be.visible'), {timeout: 10000};
  });

    it('TC_LOGIN_003 - Login with wrong username ', () => {
     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',  {timeout: 10000});

     cy.get('input[placeholder="Username"]').type('admin12'), {timeout: 10000};
     cy.get('input[placeholder="Password"]').type('admin123'), {timeout: 10000};
     cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages');

     cy.get('button[type="submit"]').click(), {timeout: 10000};

     cy.wait('@messages').its('response.statusCode').should('eq',304), {timeout: 10000};
     cy.contains('Invalid credentials').should('be.visible');
  });

    it('TC_LOGIN_004 - Login without input username and password', () => {
     cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('authPageLoad');

     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { timeout: 20000 });
     cy.get('button[type="submit"]').click(), {timeout: 20000};
    
     cy.wait('@authPageLoad').its('response.statusCode').should('eq',200), {timeout: 10000};
     cy.contains('Required').should('be.visible');
  });

    it('TC_LOGIN_005 - Refresh after failed login', () => {
     cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages');

     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { timeout: 50000 });
     cy.get('button[type="submit"]').click(), {timeout: 10000};

     cy.wait('@messages').its('response.statusCode').should('eq',200), {timeout: 10000};
     cy.contains('Required').should('be.visible');
     cy.reload();
  });

    it('TC_LOGIN_006 - Verify the Login button is enabled only when both fields are filled', () => {
     cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('authPageLoad');

     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { timeout: 50000 });
     cy.get('input[placeholder="Password"]').type('admin123'), {timeout: 10000};

     cy.get('button[type="submit"]').click(), {timeout: 10000};

     cy.wait('@authPageLoad').its('response.statusCode').should('be.eq',200), {timeout: 10000};
     cy.contains('Required').should('be.visible'), {timeout: 10000};
  });

    it('TC_LOGIN_007 - Verify login with space before username', () => {
     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { timeout: 20000 });
     cy.get('input[placeholder="Username"]').type(' Admin'), {timeout: 10000};
     cy.get('input[placeholder="Password"]').type('admin123'), {timeout: 10000};
  
     cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('authValidate');
     cy.get('button[type="submit"]').click(), {timeout: 10000};

     cy.wait('@authValidate').its('response.statusCode').should('eq',302);
     cy.contains('Invalid credentials').should('be.visible'), {timeout: 10000};
  });

  it('TC_LOGIN_008 - Login with credentials valid and different intercept', () => {
     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',  {timeout: 10000});

     cy.get('input[placeholder="Username"]').type('Admin'), {timeout: 10000};
     cy.get('input[placeholder="Password"]').type('admin123'), {timeout: 10000};
     cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit').as('subunit');
     cy.get('button[type="submit"]').click(), {timeout: 10000};

     cy.wait('@subunit').its('response.statusCode').should('eq',200), {timeout: 10000};
     cy.contains('Dashboard').should('be.visible'), {timeout: 10000};

  });
});
