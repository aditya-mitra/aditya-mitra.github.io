context('card', () => {
	/*
	 * we are testing the "Whatster"
	 * it needs to remain constant throughout updating
	 * also it should have 3 items
	 */

	beforeEach(() => {
		cy.visit('/');

		cy.get('article')
			.contains(/whatster/gi)
			.scrollIntoView()
			.parentsUntil('article')
			.parent()
			.as('testArticle');
	});

	describe('radio buttons functioning', () => {
		beforeEach(() => {
			cy.get('@testArticle')
				/* find is used to retreive the element inside a get */
				.find('[type="radio"]')
				.as('radios');
		});

		it('3 radios buttons should be present', () => {
			cy.get('@radios').should('have.length', 3);
		});

		it('only first radio button should be checked', () => {
			cy.get('@radios').eq(0).should('be.checked');
		});

		it('the second and third radio buttons should not be checked', () => {
			cy.get('@radios').eq(1).should('not.be.checked');

			cy.get('@radios').eq(2).should('not.be.checked');
		});

		it('content and radio changes on checking the other radio button', () => {
			cy.get('@testArticle').find('[id^=item]').as('cardContents');

			cy.get('@radios').eq(1).parent().click({ force: true });

			cy.get('@radios')
				.eq(0)
				.should('not.be.checked')
				.get('@radios')
				.eq(1)
				.should('be.checked');

			cy.get('@cardContents')
				.eq(0)
				.should('not.have.class', 'visible')
				.get('@cardContents')
				.eq(1)
				.should('have.class', 'visible');
		});
	});

	describe('card content items functioning', () => {
		beforeEach(() => {
			cy.get('@testArticle').find('[id^=item]').as('cardContents');
		});

		it('contains 3 card content items', () => {
			cy.get('@cardContents').should('have.length', 3);
		});

		it('only first content item should be visible', () => {
			cy.get('@cardContents').eq(0).should('have.class', 'visible');
		});

		it('the second and third content should not be visible', () => {
			cy.get('@cardContents').eq(1).should('not.have.class', 'visible');

			cy.get('@cardContents').eq(2).should('not.have.class', 'visible');
		});
	});

	describe('swiping over the card works', () => {
		beforeEach(() => {
			cy.get('@testArticle').find('[id^=item]').as('cardContents');

			cy.get('@testArticle').find('[type="radio"]').as('radios');
		});

		const checkCard = (a, b) => {
			cy.get('@cardContents')
				.eq(a)
				.should('not.have.class', 'visible')
				.get('@cardContents')
				.eq(b)
				.should('have.class', 'visible');

			cy.get('@radios')
				.eq(a)
				.should('not.be.checked')
				.get('@radios')
				.eq(b)
				.should('be.checked');
		};

		it('mousemove changes the card content', () => {
			const swipeLeft = () => {
				cy.get('@testArticle')
					.eq(0)
					.trigger('mouseup', { force: true })
					.trigger('mousedown')
					.trigger('mousemove', 'left');
			};

			const swipeRight = () => {
				cy.get('@testArticle')
					.eq(0)
					.trigger('mouseup', { force: true })
					.trigger('mousedown')
					.trigger('mousemove', 'right');
			};

			swipeLeft();
			checkCard(0, 1);

			swipeLeft();
			checkCard(1, 2);

			swipeLeft();
			checkCard(1, 2);

			swipeRight();
			checkCard(2, 1);
		});
		/*
        it('touch changes card content', () => {
            const pointerEvent = {
                force: true,
                pointerType: 'touch',
            }

            const swipeLeft = () => {
                cy
                    .get('@testArticle').eq(0)
                    .trigger('touchstart')
            }

            const swipeRight = () => {
                cy
                    .get('@testArticle').eq(0)
                    .trigger('touchstart')
                    .trigger('touchmove', 'right')
                    .trigger('touchend', { force: true });
            }

            swipeLeft();
            checkCard(0, 1);

            swipeLeft();
            checkCard(1, 2);

            swipeLeft();
            checkCard(1, 2);

            swipeRight();
            checkCard(2, 1);
        });*/
	});
});
