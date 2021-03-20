context('image snapshots', () => {
	beforeEach('set darkmode and viewport', () => {
		cy.visit('/');
		localStorage.setItem('chakra-ui-color-mode', 'light');
		cy.wait(100).reload().viewport(1536, 960); // mackbook-16
	});

	describe('snapshot tests on containers in light mode', () => {
		it('about container', () => {
			cy.get('body')
				.find('[data-cy=border-animation]')
				.get('[data-cy=about-container]')
				.matchImageSnapshot();
		});

		it('landing container', () => {
			cy.get('#pageLanding').siblings().eq(0).matchImageSnapshot();
		});

		it('skills container', () => {
			cy.get('#skillcard-0').scrollIntoView().parent().matchImageSnapshot();
		});

		it('project cards', () => {
			cy.get('#myProjects').scrollIntoView().parent().matchImageSnapshot();
		});

		it('footer container', () => {
			cy.get('footer')
				.contains(/talk with me/gi)
				.scrollIntoView()
				.parentsUntil('footer')
				.parent()
				.matchImageSnapshot();
		});
	});

	describe('full page snapshot tests', () => {
		it('in light mode', () => {
			cy.get('body').matchImageSnapshot();
		});

		it('in dark mode', () => {
			cy.get('#modeSwitch').click({ force: true });

			cy.get('body').matchImageSnapshot();
		});

		it.only('mobile view', () => {
			cy.viewport(375, 812) // iphone-x
				.get('body')
				.matchImageSnapshot();
		});
	});
});
