context("about", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('animation changes on darkmode change', () => {

        /* both logging and html not working*/
        const prevAnimation = cy
            .get('[data-cy=about-container]')
            .invoke('html');

        console.log(prevAnimation, 'is the content got');

        cy
            .get('#modeSwitch')
            .click({ force: true });
                
    })
})