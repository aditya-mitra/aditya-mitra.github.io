context("navbar", () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('click the browse more button and get it contents',() => {
        cy
            .get('#navbar')
            .contains(/browse more/gi)
            .click({ force: true });

        
        cy
            .get('#navbar')
            .should(content => {
                const str = content.text();
                const idx = str.search(/projects/gi);
                expect(idx).not.equal(-1);
            });

    });

});