import { useColorMode } from "@chakra-ui/react";
import styles from "@/styles/fire.js";

export default function fireAnimation () {
    const { colorMode } = useColorMode();
    return (
        <>
            <style jsx>
                {styles}
            </style>
            <div
                className={`container ${colorMode === "dark" ? "dark" : null}`}
            >
                <div className="fire-container">
                    <div className="fire-left">
                        <div className="main-fire"></div>
                        <div className="particle-fire"></div>
                    </div>
                    <div className="fire-main">
                        <div className="main-fire"></div>
                        <div className="particle-fire"></div>
                    </div>
                    <div className="fire-right">
                        <div className="main-fire"></div>
                        <div className="particle-fire"></div>
                    </div>
                    <div className="fire-bottom">
                        <div className="main-fire"></div>
                    </div>
                </div>
            </div>
        </>
    );
}