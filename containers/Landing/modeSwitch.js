import { memo, useEffect } from 'react';

import { Tooltip, useColorMode } from '@chakra-ui/react';
import styles from '@/styles/modeSwitch';
import { invisibleText as invisibleTextClass } from '@/styles/utils.module.css';

export default memo(function ModeSwitch() {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDarkMode = colorMode === 'dark';

	useEffect(() => {
		if (isDarkMode) {
			document.body.setAttribute('data-theme', 'dark');
		} else {
			document.body.setAttribute('data-theme', 'light');
		}
	}, [colorMode]);

	return (
		<>
			<style jsx>{styles}</style>
			<Tooltip
				label={`click to change to ${isDarkMode ? 'dark' : 'light'} mode`}
				hasArrow
				bg={isDarkMode ? 'white' : 'black'}
				color={isDarkMode ? 'black' : 'white'}>
				<div className="container">
					<label htmlFor="modeSwitch" className={invisibleTextClass}>
						{colorMode} Mode
					</label>
					<input
						className="l"
						id="modeSwitch"
						type="checkbox"
						checked={isDarkMode}
						onChange={toggleColorMode}
					/>
				</div>
			</Tooltip>
		</>
	);
});
