import loginPage from "../support/pageObjects/loginFeature";
import loginData from "../fixtures/loginData.json"

describe('OrangeHRM Login Feature', () => {
  it('TC_LOGIN_001 - Login with credentials valid', () => {
    //cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',  {timeout: 10000});
    //cy.get('input[placeholder="Username"]').type('Admin'), {timeout: 10000};
    //cy.get('input[placeholder="Password"]').type('admin123'), {timeout: 10000};
    //cy.get('button[type="submit"]').click(), {timeout: 10000};
    //cy.contains('Dashboard').should('be.visible'), {timeout: 10000};
    
    loginPage.visit(), {timeout: 10000};
    loginPage.inputUsername(loginData.validUsername), {timeout: 10000};
    loginPage.inputPassword(loginData.validPassword), {timeout: 10000};
    loginPage.clickLoginButton(), {timeout: 10000};
    loginPage.assertionLogin(), {timeout: 10000};
  });

  it('TC_LOGIN_002 - Login with invalid password ', () => {
    loginPage.visit(), {timeout: 10000};
    loginPage.inputUsername(loginData.validUsername), {timeout: 10000};
    loginPage.inputPassword(loginData.invalidPassword), {timeout: 10000};
    loginPage.clickLoginButton(), {timeout: 10000};
  });


  it('TC_LOGIN_003 - Login with invalid username ', () => {
    loginPage.visit(), {timeout: 10000};
    loginPage.inputUsername(loginData.invalidUsername), {timeout: 10000};
    loginPage.inputPassword(loginData.validPassword), {timeout: 10000};
    loginPage.clickLoginButton(), {timeout: 10000};
  });


  it('TC_LOGIN_004 - Login without input username and password', () => {
    loginPage.visit(), {timeout: 10000};
    loginPage.clickLoginButton(), {timeout: 10000};
  });

   it('TC_LOGIN_005 - Refresh after failed login', () => {
    loginPage.visit(), {timeout: 10000};
    loginPage.clickLoginButton(), {timeout: 10000};
    loginPage.reload(), {timeout: 10000};
  });

  it('TC_LOGIN_006 - Verify the Login button is enabled only when both fields are filled', () => {
    loginPage.visit(), {timeout: 10000};
    loginPage.inputPassword(loginData.validPassword), {timeout: 10000};
    loginPage.clickLoginButton(), {timeout: 10000};
  });

 it('TC_LOGIN_007 - Verify login with space before username', () => {
    loginPage.visit(), {timeout: 10000};
    loginPage.inputUsername(loginData.spaceBeforeUsername), {timeout: 10000};
    loginPage.inputPassword(loginData.validPassword), {timeout: 10000};
    loginPage.clickLoginButton(), {timeout: 10000};
  });
});
