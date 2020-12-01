import { memo, useEffect } from "react";

import { Tooltip, useColorMode } from "@chakra-ui/react";
import styles from '@/styles/modeSwitch';

export default memo(function ModeSwitch() {
    const { colorMode, toggleColorMode } = useColorMode();
    useEffect(() => {
        if (colorMode === "dark") {
            document.body.setAttribute("data-theme", "dark");
        } else {
            document.body.setAttribute("data-theme", "light");
        }
    }, [colorMode]);
    return (
        <>
            <style jsx>
                {styles}
            </style>
            <Tooltip
                label={`click to change to ${colorMode === "dark" ? "dark" : "light"} mode`}
                hasArrow
                bg={colorMode === "dark" ? "white" : "black"}
                color={colorMode === "dark" ? "black" : "white"}
            >
                <div className="container">
                    <input
                        className="l" id="modeSwitch"
                        type="checkbox"
                        checked={colorMode === "dark"}
                        onChange={toggleColorMode} />
                </div>
            </Tooltip>
        </>
    );
});