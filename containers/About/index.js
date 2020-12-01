import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { useColorMode } from "@chakra-ui/react";

import AboutMe from "./aboutMe";
import constants from "./constants";

import {
    aboutContainer as containerClass,
    dark
} from "@/styles/extras.module.css";

export default function About() {

    const [Fire, setFire] = useState(null);

    useEffect(() => {
        const loadFire = () => {
            const fire = dynamic(() => import('./fireAnimation'));
            setFire(fire);
            window.removeEventListener('load', loadFire);
        }
        window.addEventListener('load', loadFire);
    }, []);


    const { colorMode } = useColorMode();
    const darkClass = colorMode === "dark" ? dark : null;
    const classes = containerClass + " " + darkClass;
    return (
        <div className={classes}>
            {Fire ? <Fire /> : null}
            <AboutMe
                title={constants.title}
                subTitle={constants.subTitle}
                description={constants.description}
                image={constants.image}
                status={constants.status}
            />
        </div>
    );
}