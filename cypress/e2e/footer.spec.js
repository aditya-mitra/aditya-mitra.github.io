context('footer', () => {
    beforeEach(() => {
        cy.visit('/');
        cy
            .get('#findMe')
            .scrollIntoView();
    });

    const getDimensions = (element) => {
        const win = element.ownerDocument.defaultView;

        const height = win
            .getComputedStyle(element)
            .getPropertyValue('height');

        const width = win
            .getComputedStyle(element)
            .getPropertyValue('width');

        return { height, width };
    }

    describe('anchor links functioning', () => {
        beforeEach(() => {
            cy
                .get('span')
                /* just doing get(/talk with me/gi)
                 * would yeild an element 'talk with me
                 * cy.get works just like css selectors'*/
                .contains(/talk with me/gi)
                .parent()
                .find('a')
                .as('anchors');
        });

        it('contains the telegram link', () => {
            const arr = [];
            cy
                .get('@anchors')
                .each(a => {
                    arr.push(a.attr('href'));
                })
                .then(() => {
                    expect(arr).to.contain('https://t.me/uinstinct');
                });
        });

        it('highlighter changes height and width on hovering', () => {
            let lastHeight = '';
            let lastWidth = '';

            cy
                .get('#highlighter')
                .then(el => {
                    const dimensions = getDimensions(el[0]);
                    lastHeight = dimensions.height;
                    lastWidth = dimensions.width;
                });

            cy
                .get('@anchors').eq(0)
                .trigger('mouseover')
                .get('#highlighter')
                .then(el => {
                    const { height: curHeight, width: curWidth } = getDimensions(el[0]);
                    expect(curHeight).not.to.equal(lastHeight);
                    expect(curWidth).not.to.equal(lastWidth);
                });
        });

        it('highlighter changes transform on hovering', () => {

            let lastTranslateX = null;
            let lastTranslateY = null;

            const getTranslates = (element) => {
                const win = element.ownerDocument.defaultView;

                const style = win.getComputedStyle(element);
                const matrix = new WebKitCSSMatrix(style.transform);

                return {
                    X: matrix.m41,
                    Y: matrix.m42
                }
            }

            cy
                .get('#highlighter')
                .then(el => {
                    const translates = getTranslates(el[0]);
                    lastTranslateX = translates.X;
                    lastTranslateY = translates.Y;
                })
                .viewport('ipad-2')
                .get('@anchors').eq(0)
                .trigger('mouseover')
                .wait(2000)
                // wait for the highlighter to move and appear over the link
                .get('#highlighter')
                .then(el => {
                    const { X: curX, Y: curY } = getTranslates(el[0]);
                    expect(curX).not.to.equal(lastTranslateX);
                    expect(curY).not.to.equal(lastTranslateY);
                    lastTranslateX = curX;
                    lastTranslateY = curY;
                })
                .viewport('iphone-x')
                .get('@anchors').eq(1)
                .trigger('mouseover')
                .wait(1000)
                .get('#highlighter')
                .then(el => {
                    const { X: curX, Y: curY } = getTranslates(el[0]);
                    expect(curX).not.to.equal(lastTranslateX);
                    expect(curY).not.to.equal(lastTranslateY);
                })
        });

    });

    describe('built with functioning', () => {
        beforeEach(() => {
            cy
                .get('div')
                .contains(/my portfolio site built with/gi)
                .as('builtWith');
        })

        it.only('has the github url', () => {
            cy
                .get('@builtWith')
                .find('a')
                .should('have.attr', 'href', 'https://github.com/aditya-mitra/aditya-mitra.github.io/');
        });

        it.only('highlighter changes dimensions on hovering', () => {
            let lastHeight = '';
            let lastWidth = '';

            cy
                .get('#highlighter')
                .then(el => {
                    const dimensions = getDimensions(el[0]);
                    lastHeight = dimensions.height;
                    lastWidth = dimensions.width;
                })
                .get('@builtWith')
                .find('a').eq(0)
                .trigger('mouseover')
                .wait(2000)
                .get('#highlighter')
                .then(el => {
                    const { height: curHeight, width: curWidth } = getDimensions(el[0]);
                    expect(curHeight).not.to.equal(lastHeight);
                    expect(curWidth).not.to.equal(lastWidth);
                });
        });
    });

})