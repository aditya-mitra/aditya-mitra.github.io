/** set the card back to original transformation after a timeout
 * @param {HTMLDivElement} skillCardEl
 */
export function handleMouseLeave(skillCardEl) {
    setTimeout(() => {
        skillCardEl.style.transform = "none";
        skillCardEl.style.zIndex = "0";
    }, 650);
}

/** 3d transforms the card towards the screen
 *  at the point where the mouse is present
 * @param {import('react').MouseEvent} event
 * @param {HTMLDivElement} skillCardEl
 */
export function handleMouseMove(event, skillCardEl) {
    const { offsetX, offsetY } = event.nativeEvent;
    skillCardEl = skillCardEl ?? event.target;
    const { height, width } = skillCardEl.getBoundingClientRect();

    const x = (-(offsetX - (width / 2)) / 3) / 3;
    const y = ((offsetY - (height / 2)) / 3) / 3;

    skillCardEl.style.transform = `perspective(500px) rotateX(${x}deg) rotateY(${y}deg) scale3d(1.2,1.2,1.2)`;
    skillCardEl.style.zIndex = "90"; // navbar has z-index = 99
}