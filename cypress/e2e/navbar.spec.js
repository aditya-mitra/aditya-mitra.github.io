context("navbar", () => {
    beforeEach(() => {
        //cy.visit('/', {
        //    onBeforeLoad(win) {
        //        cy
        //            .stub(win, 'matchMedia')
        //            .withArgs('(prefers-color-scheme: dark)')
        //            .returns({
        //                matches: false,
        //            })
        //    },
        //});

        cy.visit('/');
        localStorage.setItem('chakra-ui-color-mode', 'light');
        cy
            .wait(100)
            .reload();
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

    it('check if darkmode switch works', () => {
        cy
            .get('#modeSwitch')
            .click({ force: true })
            .get('body')
            .should('have.attr', 'data-theme', 'dark')
        cy
            .get('#modeSwitch')
            .click({ force: true })
            .get('body')
            .should('have.attr', 'data-theme', 'light');
    });

    it('persists the color mode when page is reloaded', () => {
        cy
            .get('#modeSwitch')
            .click({ force: true })
            .get('body')
            .should('have.attr', 'data-theme', 'dark');
        cy
            .reload()
            .get('body')
            .should('have.attr', 'data-theme', 'dark');
    });

});