import { useEffect, useRef } from 'react';

import constants from "./constants";
import Card from "./card";

import {
    containerHeader as headerClass
} from "@/styles/extras.module.css";

export default function Projects() {

    const containerRef = useRef(null);

    let count = 1;
    const cards = constants.map((constant, idx) => {
        const { items } = constant;
        const sourceItems = items.map(item => {
            item["id"] = count++;
            return item;
        })
        return <Card key={idx} sourceItems={sourceItems} links={constant.links} stacks={constant.stacks} />
    });

    useEffect(() => {
        const container = containerRef.current;
        const handleEvent = () => {
            container.removeEventListener('mouseenter', handleEvent);
            container.removeEventListener('touchstart', handleEvent);
        }
        container.addEventListener('mouseenter', handleEvent);
        container.addEventListener('touchstart', handleEvent);
    }, []);

    return (
        <div
            ref={containerRef}
        >
            <h1 id="myProjects" className={headerClass}>My Projects</h1>
            {cards}
        </div>
    );
}