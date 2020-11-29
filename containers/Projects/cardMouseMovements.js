import { createStandaloneToast, Box, Icon } from "@chakra-ui/react";
import { GiSideswipe } from "react-icons/gi";

let willDrag = false;
let originalPosX = 0;

function changeCard(displayCard, value) {
    const event = { target: { value } };
    displayCard(event);
    willDrag = false;
}

export function handleDragStart(event, totalItems) {
    if (totalItems > 1) {
        willDrag = true;
        originalPosX = event.nativeEvent.pageX;
    }
}

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

export function handleDragEnd() {
    willDrag = false;
}

export function handleTouchStart(event) {
    const { touches } = event;
    if (touches && touches.length === 1) {
        originalPosX = touches[0].clientX;
    }
}

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


export async function showSwipeGuide() {

    await new Promise(resolve => setTimeout(resolve, 1500));
    const toast = createStandaloneToast();
    toast({
        position: "bottom-left",
        render: () => (
            <Box
                p={1} maxWidth="sm"
                color="white" bg="orange.400" opacity="0.9"
                borderRadius="lg" textAlign="center"
            >
                <pre style={{ fontFamily: "Fugaz One, cursive" }}>Hey, try swiping
                    <Icon as={GiSideswipe} margin="0 0.3rem" />
                    on my card!
                </pre>
            </Box>
        ),
        duration: 5000,
    });
}