import {
    Icon, IconButton, Link,
    Tag, TagLabel, TagRightIcon
} from '@chakra-ui/react';

import placeholders from "./placeholders";
import { glossColour, glossIcon } from "./constants";

import { tag as tagClass } from '@/styles/utils.module.css';
import { itemStyles, bulletStyles } from '@/styles/card';

/**
 * links to the sites and repos of the project
 * @param {Array<{link:String,provider:String,darkModeColour:String}>} links
 * @param {String} colorMode
 */
export const LinkButtons = (links, colorMode) =>
    links.map((link, idx) => {
        const icon = <Icon as={glossIcon[link.provider]} />;
        let colour = glossColour[link.provider];
        
        if ('darkModeColour' in link && colorMode === "dark") {
            colour = link.darkModeColour;
        }
        
        return (
            <Link isExternal href={link.link} key={idx}>
                <IconButton
                    aria-label={link.provider}
                    icon={icon} color={colour}
                    variant="ghost" isRound="true" size="lg"
                />
            </Link>
        );
    });

/**
 * stacks used for the project
 * @param {Array<String>} stacks
 */
export const StackTags = (stacks) =>
    stacks.map((stack, idx) => {
        const icon = glossIcon[stack] || glossIcon["other"];
        const colour = glossColour[stack] || "gray";

        return (
            <Tag
                key={idx} colorScheme={colour}
                rounded="full" variant="solid"
                className={tagClass}
            >
                <TagLabel>{stack}</TagLabel>
                <TagRightIcon as={icon} />
            </Tag>
        );
    });

/**
 * title, description,image of the projects
 * @param {String} codex
 * @param {Array<{title:String,description:String,imgSrc:String}>} sourceItems
 * @param {string} colorMode
 * @param {Number} uniqueMark
 * @param {Boolean} hasScaledOut
 */
export const CardItems =
    (codex, sourceItems, colorMode, uniqueMark, hasScaledOut) => {
        let bgStyles = placeholders[codex]
            || placeholders["default"];

        if (hasScaledOut === true) {
            bgStyles = {
                ...bgStyles,
                filter: "none",
                transform: "none",
            };
            if (colorMode === "dark") {
                bgStyles.filter = "invert(1) hue-rotate(180deg)";
            }
        }        

        return sourceItems.map((sourceItem, idx) => {
            const { id } = sourceItem;
            const imgSrc = hasScaledOut === true ?
                sourceItem.imgSrc : null;
            return (
                <div key={idx}>
                    <style jsx>
                        {itemStyles}
                    </style>
                    <div className={`wrapper ${colorMode === "dark" ? "dark" : null}`}>
                        <div
                            key={idx} id={`item${id}`}
                            className={`source-item-${uniqueMark} item item-${idx + 1}`}
                        >
                            <div
                                className="imageContainer"
                                style={bgStyles}
                            >
                                <img
                                    src={imgSrc}
                                    alt={sourceItem.title}
                                    loading="lazy"
                                    height="300" width="300"
                                />
                            </div>
                            <div className="content">
                                <div className="title">
                                    {sourceItem.title}
                                </div>
                                <div className="description">
                                    {sourceItem.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

/**
 * display current acitve card item
 * click on the radio to the card content
 * @param {Array<{id:Number,}>} sourceItems
 * @param {Number} currentItem
 * @param {Number} totalItems
 * @param {Function} displayCard
 */
export const RadioBullets =
    (sourceItems, currentItem, totalItems, displayCard) =>
        totalItems > 1 ? sourceItems.map((sourceItem, idx) => {
            const { id } = sourceItem;
            return (
                <div key={idx}>
                    <style jsx>
                        {bulletStyles}
                    </style>
                    <label
                        htmlFor={`tapInput${id}`} id={`tap${id}`}
                        className="tap"
                    >
                        <input type="radio" id={`tapInput${id}`}
                            value={id}
                            checked={id === currentItem}
                            onChange={displayCard}
                        />
                    </label>
                </div>
            );
        })
            : null;

/**
 * sets the intersection observer for the card
 * and makes the first item of the project content visible
 * and the first radio button checked
 * @param {HTMLDivElement} container
 * @param {Number} uniqueMark
 * @param {Number} totalItems
 * @param {Object} hasScaledOut
 */
export function mountObserverCard(container, uniqueMark, totalItems, setHasScaledOut) {

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                setHasScaledOut(true);
                observer.disconnect();
            }
        },
        {
            root: null,
            rootMargin: '0px',
            threshold: 0.65
        });
    observer.observe(container);

    const item = container.querySelector(`#item${uniqueMark}`);
    item.classList.add("visible");
    if (totalItems > 1) {
        const tap = container.querySelector(`#tap${uniqueMark}`);
        tap.classList.add("checked");
    }
}