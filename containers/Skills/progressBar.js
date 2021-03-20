import { memo } from 'react';

import styles from '@/styles/progressBar';

const level = (width) => {
	if (width >= 0 && width <= 50) {
		return 'learning new';
	} else if (width > 50 && width <= 85) {
		return 'sharpening with project';
	} else if (width > 85 && width <= 92) {
		return 'ready to contribute';
	} else {
		return 'hunting for contests';
	}
};

export default memo(function ProgressBar({ progress }) {
	const width = progress;
	return (
		<>
			<style jsx>{styles}</style>
			<div className="progress progress-success progress-striped active">
				<div className="bar" style={{ width: `${width}%` }}>
					{level(width)}
				</div>
			</div>
		</>
	);
});
