describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

beforeEach(() => {
  cy.visit("/");
})

describe("Tests of start page", () => {
  it("There is an input", () => {
    cy.get("input").should("exist");
  })

  it("There is an empty input field", () => {
    cy.get("input").should("contain", "");
  })

  it("There is a search button", () => {
    cy.get("button").should("exist");
  })

  it("There is a search text on the button", () => {
    cy.get("button").should("contain", "Sök");
  })
})

describe("Tests of input and search button", () => {
  it("Input has text in it", () => {
    cy.get("input").type("Love Actually").should("have.value", "Love Actually");
  })

  it("Should give back movies if clicked", () => {
    cy.get("input").type("Love Actually").should("have.value", "Love Actually")

    cy.get("button").click()

    cy.get("h3").contains("Love");
  })
})