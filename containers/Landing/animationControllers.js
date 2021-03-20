/** moves the ball in the track of the animatedBox's SVG
 *  requests another animation frame when the ball has moved
 *  and recurses itself with changed parameters
 * @param {SVGPathElement} ball
 * @param {SVGPathElement} curve
 * @param {Number} pos
 * @param {Boolean} direction
 */
function moveBall(ball, curve, pos, direction) {
	const totalLength = curve.getTotalLength();
	const loc = curve.getPointAtLength(pos * totalLength);

	ball.setAttribute('transform', `translate(${loc.x},${loc.y})`);

	/*reverse the direction if either at
    starting point or ending point*/
	if (parseInt(pos, 10) === 1 || parseInt(pos, 10) < 0) {
		direction = !direction;
	}

	if (direction) {
		pos += 0.001;
	} else {
		pos -= 0.001;
	}

	requestAnimationFrame(() => moveBall(ball, curve, pos, direction));
}

/**
 * gets the balls and letters of the passed word argument
 * and animates the each ball in each letters
 * @param {SVGSVGElement} word
 */
export default function animateWord(word) {
	const balls = word.querySelectorAll('.ball');
	const letters = word.querySelectorAll('.curve');

	for (let i = 0; i < letters.length; i++) {
		requestAnimationFrame(() => moveBall(balls[i], letters[i], 0, true));
	}
}
