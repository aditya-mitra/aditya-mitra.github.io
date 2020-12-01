/** tracks whether the mouseClick is held
 * @type boolean
 */
let willDrag = false;

/** holds the original position where the mouseClick
 *  or the touch started
 * @type number
 */
let originalPosX = 0;


/**
 * @private
 * @param {Function} displayCard
 * @param {Number} value
 */
function changeCard(displayCard, value) {
    const event = { target: { value } };
    displayCard(event);
    willDrag = false;
}

/** tracks the starting point when the mouse was clicked
 * @param {MouseEvent} event
 * @param {Number} totalItems
 */
export function handleDragStart(event, totalItems) {
    if (totalItems > 1) {
        willDrag = true;
        originalPosX = event.nativeEvent.pageX;
    }
}

/** get the position of the mouse when held and dragged
 *  change the card content if drag is more than 50
 * @param {import('react').MouseEvent} event
 * @param {Number} uniqueMark
 * @param {Number} totalItems
 * @param {Number} currentItem
 * @param {Function} displayCard
 */
export function handleDrag(
    event, uniqueMark, totalItems,
    currentItem, displayCard
) {
    if (willDrag) {
        const moveX = event.nativeEvent.pageX
        const shiftX = moveX - originalPosX;

        const relativeCurrent = currentItem - uniqueMark;
        if (shiftX < -50 && relativeCurrent < totalItems - 1) {
            changeCard(displayCard, currentItem + 1);
        } else if (shiftX > 50 && relativeCurrent > 0) {
            changeCard(displayCard, currentItem - 1);
        }        

    }
}

/** releases the track if the mouseClick was held
 */
export function handleDragEnd() {
    willDrag = false;
}

/** track the original position when the touch began
 * @param {TouchEvent} event
 */
export function handleTouchStart(event) {
    const { touches } = event;
    if (touches && touches.length === 1) {
        originalPosX = touches[0].clientX;
    }
}

/** change the card content when the touch ends if shift is greater than 50
 * @param {import('react').TouchEvent} event
 * @param {Number} uniqueMark
 * @param {Number} totalItems
 * @param {Number} currentItem
 * @param {Function} displayCard
 */
export function handleTouchEnd(
    event, uniqueMark, totalItems,
    currentItem, displayCard
) {
    const endX = event.changedTouches[0].clientX;
    const shiftX = endX - originalPosX;

    const relativeCurrent = currentItem - uniqueMark;
    if (shiftX < -50 && relativeCurrent < totalItems - 1) {
        changeCard(displayCard, currentItem + 1);
    } else if (shiftX > 50 && relativeCurrent > 0) {
        changeCard(displayCard, currentItem - 1);
    }
}