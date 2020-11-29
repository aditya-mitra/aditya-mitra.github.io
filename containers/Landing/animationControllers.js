function moveBall(ball, curve, pos, direction) {
    const totalLength = curve.getTotalLength();
    const loc = curve.getPointAtLength(pos * totalLength);

    ball.setAttribute("transform", `translate(${loc.x},${loc.y})`);

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

export default function animateWord(word) {
    const balls = word.querySelectorAll(".ball");
    const letters = word.querySelectorAll(".curve");

    for (let i = 0; i < letters.length; i++) {
        requestAnimationFrame(() => moveBall(balls[i], letters[i], 0, true));
    }
}