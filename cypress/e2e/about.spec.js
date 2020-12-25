context("about", () => {
    beforeEach(() => {
        cy.visit('/');
        localStorage.setItem('chakra-ui-color-mode', 'dark');
        cy
            .wait(100)
            .reload();
    });

    it('fire animation should be visible on dark mode', () => {
        cy
            .get('[data-cy=fire-animation]')
            .scrollIntoView()
            .should('be.visible');
    });

    it('border animation should be visible on light mode', () => {
        cy
            .get('#modeSwitch')
            .click({ force: true })
            .get('[data-cy=border-animation]')
            .scrollIntoView()
            .should('be.visible');
    });

})