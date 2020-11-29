import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import Header from './header';

import styles from '@/styles/landing';

function handleInView(entries, container) {
    const isShown = entries[0].isIntersecting;

    const nav = container.querySelector('#navbar');
    if (isShown) {
        nav.classList.remove('fixed-navbar');
    } else {
        nav.classList.add('fixed-navbar');
    }
}

export default function LandingIndex() {
    const containerRef = useRef(null);
    const [Navbar, setNavbar] = useState(null);

    useEffect(() => {
        const container = containerRef.current;
        const navbar = dynamic(() => import('./navbar'));
        setNavbar(navbar);

        const observeNavbar = () => {
            const observer = new IntersectionObserver(
                (entries) => handleInView(entries, container),
                {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.01
                });
            observer.observe(container);
        }
        setTimeout(observeNavbar, 1000);

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
                {Navbar ? <Navbar /> : null}
            </div>
        </>
    );
}