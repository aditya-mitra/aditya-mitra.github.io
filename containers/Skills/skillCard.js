import { useRef } from 'react';

import { useColorMode, Icon } from "@chakra-ui/react";
import { allStyles, topicStyles } from "@/styles/skillCard";

import ProgressBar from "./progressBar";
import { handleMouseMove, handleMouseLeave }
    from "./skillMouseMovements";
import { glossIcon, glossColour } from "./constants";

export default function SkillBar({ heading, topics, id }) {

    const { colorMode } = useColorMode();

    const topicsDisplay = topics && topics.map((topic, idx) => {
        const name = topic.icon || (topic.name && topic.name.toLowerCase())
            || "other";
        const iconName = glossIcon[name] || glossIcon["other"];
        const iconColour = glossColour[name] || glossColour["other"];

        return (
            <div key={idx}>
                <style jsx>
                    {topicStyles}
                </style>
                <div className={`skill-progress ${colorMode === "dark" ? "dark" : null}`}>
                    <ProgressBar progress={topic.progress} />
                    <p><Icon style={{ margin: "0.25rem 1rem 0 0", }}
                        as={iconName} color={iconColour}
                    />{topic.name}</p>
                </div >
            </div>
        );
    }
    ) || [];

    const containerRef = useRef(null);
    return (
        <>
            <style jsx>
                {allStyles}
            </style>
            <div
                className={`skill-container ${colorMode === "dark" ? "dark" : null}`}
                id={`skillcard-${id}`}
                ref={containerRef}
                onMouseMove={(event) =>
                    handleMouseMove(event, containerRef.current)}
                onMouseLeave={() => handleMouseLeave(containerRef.current)}
            >
                <div className="skill-header">{heading}</div>
                {topicsDisplay}
            </div>
        </>
    );
};