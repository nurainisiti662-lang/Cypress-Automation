describe ('API Testing Data Access', () => {

    it('List Users',() => { 
        cy.request('Get','https://reqres.in/api/users?page=2')
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('data')
            })
    })
    it('Single User',() => { 
        cy.request('Get','https://reqres.in/api/users/2')
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.data).to.have.property('email')
            })
    })
    it('Create User',() => { 
        cy.request({
            method: 'Post',
            url: 'https://reqres.in/api/users',
            body: {
                    "name": "budi",
                    "job": "qa tester"
            },
            headers: {
            'x-api-key': 'reqres-free-v1'
            }
    })
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('name','budi')
            })
    })
    it('Update User',() => { 
        cy.request({
            method: 'Put',
            url: 'https://reqres.in/api/users/2',
            body: {
                    "name": "budi",
                    "job": "tester"
            },
            headers: {
            'x-api-key': 'reqres-free-v1'
            }
    })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('name','budi')
            })
            })
    it('Delete User',() => { 
        cy.request({
            method: 'Put',
            url: 'https://reqres.in/api/users/2',
            headers: {
            'x-api-key': 'reqres-free-v1'
            }
    })
            .then((response) => {
                expect(response.status).to.eq(200,204)
            })
            })         
    it('Register-Succesful',() => { 
        cy.request({
            method: 'Post',
            url: 'https://reqres.in/api/register',
            body: {
                 "email": "eve.holt@reqres.in",
                 "password": "pistol"
            },
            headers: {
            'x-api-key': 'reqres-free-v1'
            }
    })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id')
            })
    })               
    it('Login-Succesful',() => { 
        cy.request({
            method: 'Post',
            url: 'https://reqres.in/api/login',
            body: {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
            },
            headers: {
            'x-api-key': 'reqres-free-v1'
            }
    })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('token')
            })
    })
    it('Delayed Response',() => { 
        cy.request({
            method: 'Get',
            url: 'https://reqres.in/api/users?delayed=3',
            headers: {
            'x-api-key': 'reqres-free-v1'
            }
    })            
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('data')
            })
    })
    it('List <Resource>',() => { 
        cy.request({
            method: 'Get',
            url: 'https://reqres.in/api/unknown',
            headers: {
            'x-api-key': 'reqres-free-v1'
            }
    })          
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('data')
            })
    })
    it('Single <Resource>',() => { 
        cy.request({
            method: 'Get',
            url: 'https://reqres.in/api/unknown/2',
            headers: {
            'x-api-key': 'reqres-free-v1'
            }
    })          
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('data')
            })
    })               
})