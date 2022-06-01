/// <reference types="cypress" />

describe("Suite of E2E tests for navigating around page", () => {
    it("visits the site", () => {
        cy.visit("https://corpsquad-dashboard-dearman.netlify.app/")
        cy.contains("Loading")
        cy.contains("CorpSquad Consultancy")
        cy.wait(5000)
        cy.contains("Total Project")
        cy.contains("d65fdf33bf2ecbd7d776fb6f")
    });
    it("clicks on a client", () => {
        cy.contains("2ec9bd930dda13b7ab869fff").click()
        cy.wait(4000)
        cy.contains("Lesch Group")
        cy.contains("2ec9bd930dda13b7ab869fff")
    })
    it("returns home", () => {
        cy.contains("Home").click()
        cy.contains("Total Project")
        cy.contains("Filter")
    })
    it("clicks on an employee", () => {
        cy.contains("5cdbf84f55cdc05e91607dcc").click()
        cy.wait(4000)
        cy.contains("Miriam Lindgren")
        cy.contains("Investor Directives Developer")
    })
    it("clicks on a client from an employee", () => {
        cy.contains("de5ae2e13eb51b4f20dbfc74").click()
        cy.wait(4000)
        cy.contains("Botsford, Ledner and Bruen")
    })
})

describe("Suite of E2E tests for filters", () => {
    it("visits the site", () => {
        cy.visit("https://corpsquad-dashboard-dearman.netlify.app/")
        cy.contains("Loading")
        cy.contains("CorpSquad Consultancy")
        cy.wait(5000)
        cy.contains("Total Project")
        cy.contains("d65fdf33bf2ecbd7d776fb6f")
    });
    it("filters for projects greater than 65k", () => {
        cy.get("input").eq(0).type("65000")
        cy.contains("eefea3eabfba4daf710949c1")
        cy.contains("ee72aa4b8ecd4ccb6a72b8ef").should("not.exist")
    })
    it("filters for projects less than 40k", () => {
        cy.get("input").eq(0).clear()
        cy.get("input").eq(1).type("40000")
        cy.contains("f5bd0ddc28deafdf1af3d72b").should("not.exist")
    })
    it("filters for projects by specific client", () => {
        cy.get("select").eq(0).select("Murray, Corwin and Mante")
        cy.contains("2ebfad09bacb0c0cc031b5fa")
        cy.contains("ee72aa4b8ecd4ccb6a72b8ef").should("not.exist")
    })
    it("clears filters", () => {
        cy.get("button").eq(0).click()
        cy.contains("Showing 100 Projects")
    })
})

