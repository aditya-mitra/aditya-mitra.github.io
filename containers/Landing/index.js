import { useEffect, useRef } from 'react';

import Header from './header';
import Navbar from './navbar';

import styles from "@/styles/landing";

function handleInView(entries, container) {
    const isShown = entries[0].isIntersecting;

    const nav = container.querySelector('#navbar');
    if (isShown) {
        nav.classList.remove('fixed-navbar');
    } else {
        nav.classList.add('fixed-navbar');
    }
}

export default function LandingContainer() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const observer = new IntersectionObserver(
            (entries) => handleInView(entries, container),
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.01
            });
        observer.observe(container);
    }, []);

    return (
        <>
            <span id="pageLanding" style={{ visibility: "hidden" }} />
            <style jsx>
                {styles}
            </style>
            <div
                className="landingHeader"
                ref={containerRef}
            >
                <Header />
                <Navbar />
            </div>
        </>
    );
}