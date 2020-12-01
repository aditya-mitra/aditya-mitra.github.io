import { memo } from 'react';
import { useColorMode } from "@chakra-ui/react";

import styles from "@/styles/aboutMe";

export default memo(function AboutMe({ title, subTitle, description, image, status }) {
    const { colorMode } = useColorMode();
    return (
        <>
            <style jsx>
                {styles}
            </style>
            <div className={`container ${colorMode === "dark" ? "dark" : null}`} id="myAbout">
                <div className="column">
                    <div className="module">
                        <div className="thumbnail">
                            <img src={image} alt={title}
                                loading="lazy"
                            />
                        </div>
                        <div className="content">
                            <h1 className="title">{title}</h1>
                            <h2 className="sub-title">{subTitle}</h2>
                            <p className="description">{description}</p>
                            <div className="meta-status">{status}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});