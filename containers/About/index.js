import { useColorMode } from "@chakra-ui/react";

import Fire from "./fireAnimation";
import AboutMe from "./aboutMe";
import constants from "./constants";

import {
    aboutContainer as containerClass,
    dark
} from "@/styles/extras.module.css";

export default function About() {
    const { colorMode } = useColorMode();
    const darkClass = colorMode === "dark" ? dark : null;
    const classes = containerClass + " " + darkClass;
    return (
        <div className={classes}>
            <Fire />
            <AboutMe title={constants.title} subTitle={constants.subTitle}
                description={constants.description} image={constants.image}
                status={constants.status}
            />
        </div>
    );
}