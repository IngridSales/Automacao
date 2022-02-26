/// <reference types = "cypress"/>

var email = "email@email.com"
var nome = "Nome"

var nome_num = "123"

const inputs = [{
            "id":"#email"

        },{
            "id":"#name"

        },{
            "id":"#observation"

        },{
            "id":".btn"

        }]

const checkbox = [
        {
            "id":"#credentials"
        
        },{
            "id":"#phishing"
        
        },{
            "id":"#passwordGuard"
        
        },{
            "id":"#securityTrello"
        
        },{
            "id":"#securityRepositories"
        
        },{
            "id":"#securityConfluence"
        
        },{
            "id":"#securityBitbucket"
        
        },{
            "id":"#securityCloudGoogle"
        
        },{
            "id":"#securityGoogleAccount"
        
        },{
            "id":"#securitySmartphone"
        }]

describe("Teste no formulário", () => {

    it("Validar se todos os campos estão visiveis", () => {

        cy.visit("https://storage.googleapis.com/tests-qa/index.html")

        inputs.forEach(campos => {
            cy.get(campos.id).should("be.visible")
        });
        checkbox.forEach(campos => {
            cy.get(campos.id).should("be.visible")
        });
    })

    it("Preencher o formulário de forma incompleta", () => {

        cy.visit("https://storage.googleapis.com/tests-qa/index.html")

        cy.get("#email").type(email)
        cy.get("#name").type(nome)

        cy.get(".btn").click()

        cy.get(".swal2-popup").should("be.visible")

        cy.get("#swal2-title").should("contain", "Formulario invalido")

        cy.get(".swal2-confirm").click()


    })

    it("Preencher o formulário de forma completa com observação", () => {

        cy.visit("https://storage.googleapis.com/tests-qa/index.html")

        cy.get("#email").type(email)
        cy.get("#name").type(nome)

        checkbox.forEach(campos => {
            cy.get(campos.id).click()
        });
    
        cy.get("#observation").type("aaaaaaaa")

        cy.get(".btn").click()

        cy.get("#container").should("be.visible")
        cy.get("#container").should("contain", "Aprovado com observações")
    })

    it("Preencher o formulário de forma completa sem observação", () => {

        cy.visit("https://storage.googleapis.com/tests-qa/index.html")

        cy.get("#email").type(email)
        cy.get("#name").type(nome)

        checkbox.forEach(campos => {
            cy.get(campos.id).click()
        });

        cy.get(".btn").click()

        cy.get("#container").should("be.visible")
        cy.get("#container").should("contain", "Aprovado")

    })

    it("Validar se os campos de email e nome estão com validação de entrada", () => {

        cy.visit("https://storage.googleapis.com/tests-qa/index.html")

        cy.get("#email").type(email)
        cy.get("#name").type(nome_num)

        checkbox.forEach(campos => {
            cy.get(campos.id).click()
        });

        cy.get(".btn").click()

        cy.get("#container").should("not.be.visible")

       
    })


})