import ModeSwitch from './modeSwitch';

import {
    useColorMode,
    Button, Link,
    Menu, MenuButton, MenuList, MenuItem
} from "@chakra-ui/react";
import styles from "@/styles/navbar";

export default function Navbar() {
    const { colorMode } = useColorMode();

    return (
        <>
            <style jsx>
                {styles}
            </style>
            <nav
                className="navbar"
                style={{ backgroundColor: colorMode === "dark" ? "#2eb82e" : "#00cc00" }}
                id="navbar"
            >
                <Menu
                    transition="all 1s linear"
                    borderRadius="md"
                    borderWidth="none"
                    borderColor="white"
                    _focus={{ boxShadow: "none" }}
                >
                    <MenuButton as={Button} style={{
                        backgroundColor: "transparent",
                        fontFamily: "Righteous",
                        fontSize: "1.5rem",
                        color: colorMode === "dark" ? "#e2e8f0" : "#e6e6e6",
                    }}>
                        Browse More
                    </MenuButton>
                    <MenuList style={{
                        fontSize: "1.2rem",
                        fontFamily: "Righteous",
                        color: colorMode === "dark" ? "#e6e6e6" : "#5c5c3d",
                        backgroundColor: colorMode === "dark" ? "#5c5c3d" : "#e6e6e6",
                    }}>
                        <Link href="#myAbout"><MenuItem>Meet Me</MenuItem></Link>
                        <Link href="#myTechSkills"><MenuItem>Tools</MenuItem></Link>
                        <Link href="#myProjects"><MenuItem>Projects</MenuItem></Link>
                        <Link href="#findMe"><MenuItem>Connect With Me</MenuItem></Link>
                        <Link href="#pageLanding"><MenuItem>Home</MenuItem></Link>
                    </MenuList>
                </Menu>
                <ModeSwitch />
            </nav>
        </>
    );
}