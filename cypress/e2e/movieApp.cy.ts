describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
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
    cy.get("img").should("exist");
  })

  it("Should give back movies if tabbed enter", () => {
    cy.get("input#searchText").type("Love actually");
    cy.get("form").submit();
    cy.get("h3").contains("Love").should("exist");
  })

  it("Should give back nothing if wrong word added", () => {
    cy.get("input").type("pytanie").should("have.value", "pytanie");
    cy.get("button").click();
    cy.get("p").contains("Inga sökresultat att visa");
  })
})

describe("Tests with mockdata", () => {
  it("Response with mockdata that works", () => {
    cy.intercept("get", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"moviedata"}).as("moviedata");

    cy.get("input").type("Love actually").should("have.value", "Love actually");

    cy.get("button").click();

    cy.get("h3").contains("Love actually not").should("exist");
    cy.get("h3").contains("really").should("exist");
    cy.get("h3:last").contains("really").should("exist");
  })

  it('Should find correct url', () => {
    cy.intercept("get", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"moviedata"}).as("moviedata");

    cy.get("input").type("Love actually").should("have.value", "Love actually");

    cy.get("form").submit();

    cy.wait("@moviedata").its('request.url').should('contain', 'Love');

  })

  it("Respone with mockdata that returns an error", () => {
    cy.intercept("get", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"notmoviedata"}).as('tufilmówniema');

    cy.get("input").type("Love actually").should("have.value", "Love actually");

    cy.get("button").click();

    cy.get("p").contains("Inga sökresultat att visa");
  })
})