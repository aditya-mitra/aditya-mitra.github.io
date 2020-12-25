context("about", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('fire animation should be visible on dark mode', () => {
        cy
            .get('[data-cy=fire-animation]').scrollIntoView()
            .scrollIntoView()
            .should('be.visible');
    });

    it('border animation should be visible on light mode', () => {
        cy
            .get('#modeSwitch').scrollIntoView()
            .click({ force: true })
            .get('[data-cy=border-animation]').scrollIntoView()
            .should('be.visible');
    });

})