class loginPage{
    visit(){ 
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }
    inputUsername(username){
      cy.get('input[placeholder="Username"]').type(username)
    }
    inputPassword(password){
      cy.get('input[placeholder="Password"]').type(password)
    }
    clickLoginButton(){
      cy.get('button[type="submit"]').click()
    }
    assertionLogin(){
      cy.contains('Dashboard').should('be.visible')
    }
    reload(){
      cy.reload()
    }
}   

export default new loginPage()