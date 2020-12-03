import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import { useColorMode } from "@chakra-ui/react";

import AboutMe from "./aboutMe";
import constants from "./constants";

import {
    aboutContainer as containerClass,
    dark as darkClass
} from "@/styles/extras.module.css";

export default function About() {

    const [mounted, setMounted] = useState(false);
    const Fire = useRef(null);
    const BorderChanger = useRef(null);

    useEffect(() => {
        Fire.current = dynamic(() => import('./fireAnimation'));
        BorderChanger.current = dynamic(() => import('./borderChanger'));
        setMounted(true);
    }, []);

    const { colorMode } = useColorMode();
    let classes = containerClass;
    let DisplayingAnimation = BorderChanger.current;

    if (colorMode === "dark") {
        classes += " " + darkClass;
        DisplayingAnimation = Fire.current;
    }

    return (
        <div className={classes}>
            {mounted ? <DisplayingAnimation />: null}
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