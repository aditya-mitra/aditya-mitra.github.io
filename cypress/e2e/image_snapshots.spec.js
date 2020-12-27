context('image snapshots', () => {

    describe('snapshot tests on light mode', () => {

        beforeEach('set darkmode and viewport', () => {
            cy.visit('/');
            localStorage.setItem('chakra-ui-color-mode', 'light');
            cy
                .wait(100)
                .reload()
                .viewport('macbook-16');
        })

        it('about container', () => {
            cy
                .get('body')
                .find('[data-cy=border-animation]')
                .get('[data-cy=about-container]')
                .matchImageSnapshot();
        });

        it('landing container', () => {
            cy
                .get('#pageLanding')
                .siblings().eq(0)
                .matchImageSnapshot();
        });

        it('skills container', () => {
            cy
                .get('#skillcard-0')
                .scrollIntoView()
                .parent()
                .matchImageSnapshot();
        });

        it('project cards', () => {
            cy
                .get('#myProjects')
                .scrollIntoView()
                .parent()
                .matchImageSnapshot();
        });

        it('footer container', () => {
            cy
                .get('footer')
                .contains(/talk with me/gi)
                .scrollIntoView()
                .parentsUntil('footer')
                .parent()
                .matchImageSnapshot();
        });

    });

})