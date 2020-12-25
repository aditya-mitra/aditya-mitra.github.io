context("skills", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('bar has width 0 when not in view', () => {
        cy
            .get('#skillcard-0 .progress .bar')
            .eq(0)
            .should('have.css', 'width', '0px')
            .should('have.class', 'inactive');
    });

    it('bar has non-zero width when in view', () => {
        cy
            .get('#skillcard-0')
            .scrollIntoView()
            .find('.progress .bar')
            .eq(0)
            .wait(2000)
            .should('not.have.css', 'width', '0px')
            .should('not.have.class', 'inactive');
    });

});