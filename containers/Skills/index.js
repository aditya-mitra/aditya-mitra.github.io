import { useEffect, useRef } from "react";

import constants from "./constants";
import SkillCards from "./skillCard";

import styles from "@/styles/skillsContainer";
import {
    containerHeader as headerClass
} from "@/styles/extras.module.css";

function handleInView(entries, container, hasShown, observer) {
    if (entries[0].isIntersecting && !hasShown) {
        const progresses = container.getElementsByClassName("bar");
        [].forEach.call(progresses, (progress) => {
            progress.classList.remove("inactive");
        });
        hasShown = true;
        observer.disconnect();
    }
}

export default function Skills() {

    const skillCards = constants.map((constant, idx) =>
        <SkillCards
            key={idx} id={idx}
            heading={constant.heading} topics={constant.topics}
        />
    )

    const containerRef = useRef(null);

    useEffect(() => {   
        const container = containerRef.current;

        const progresses = container.getElementsByClassName("bar");
        [].forEach.call(progresses, (progress) => {
            progress.classList.add("inactive");
        });

        let hasShown = false;
        const observer = new IntersectionObserver(
            (entries) => handleInView(entries, container, hasShown, observer),
            {
                root: null,
                rootMargin: '0px',
                threshold: 1.0
            });

        const firstSkillCard = container.querySelector('.skill-container');
        observer.observe(firstSkillCard);
    }, []);

    return (
        <>
            <h1 id="myTechSkills" className={headerClass}>My Tech Skills</h1>
            <style jsx>
                {styles}
            </style>
            <div
                className="skill-main-container"
                ref={containerRef}
            >
                {skillCards}
            </div>
        </>
    );
}