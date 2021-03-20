import { memo } from 'react';

import styles from '@/styles/progressBar';

const level = (width) => {
	if (width >= 0 && width <= 50) {
		return 'rookie';
	} else if (width > 50 && width <= 85) {
		return 'seasoned';
	} else {
		return 'becoming expert';
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
