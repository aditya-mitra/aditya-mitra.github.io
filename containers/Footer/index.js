import { useEffect } from 'react';

import constants from "./constants";

import {useColorMode, Link, Icon } from "@chakra-ui/react";
import styles from "@/styles/footer";
import {
    highlight as hightlightClass
} from "@/styles/extras.module.css";


export default function Footer() {
    const { colorMode } = useColorMode();

    useEffect(() => {
        const highlighter = document.createElement('span');
        highlighter.classList.add(hightlightClass);
        highlighter.id = 'highlighter';
        highlighter.style.display = "block";
        document.body.appendChild(highlighter);
    }, []);

    const highlightLink = event => {
        const highlighter = document.getElementById('highlighter');
        const linkCoords = event.target.getBoundingClientRect();

        const coords = {
            width: linkCoords.width,
            height: linkCoords.height,
            top: linkCoords.top + window.scrollY,
            left: linkCoords.left + window.scrollX
        };

        highlighter.style.width = `${coords.width + 20}px`;
        highlighter.style.height = `${coords.height + 20}px`;
        highlighter.style.transform =
            `translate(${coords.left - 10}px,${coords.top - 10}px)`;
    }

    const finds = constants.map(constant => {
        return (
            <Link key={constant.link} isExternal
                href={constant.link}
                zIndex={50}
            >
                <Icon
                    onMouseEnter={event => highlightLink(event)}
                    as={constant.icon} color={constant.colour}
                    boxSize={8} margin="0 1rem" position="relative" order={4}
                />
            </Link>
        );
    });

    return (
        <>
            <span id="findMe" style={{ visibility: "hidden" }} />
            <style jsx>
                {styles}
            </style>
            <footer
                className={`footer ${colorMode === "dark" ? "dark" : null}`}
            >
                <div className="contact-container">
                    <span className="header">Talk With Me</span>
                    <div className="contact-icons">{finds}</div>
                </div>
                <div className="built-with">
                    <div className="border" />
                    My Portfolio Site Built With
                    <Link isExternal href="https://github.com/aditya-mitra/aditya-mitra.github.io/">
                        <span className="built">NextJS</span>
                    </Link>
                </div>
            </footer>
        </>
    );
}