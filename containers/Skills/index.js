import { useEffect, useMemo, useRef } from 'react';

import constants from './constants';
import SkillCards from './skillCard';

import {
	containerHeader as headerClass,
	skillMain as skillMainClass,
} from '@/styles/containers.module.css';

function handleInView(entries, container, hasShown, observer) {
	if (entries[0].isIntersecting && !hasShown) {
		const progresses = container.getElementsByClassName('bar');
		[].forEach.call(progresses, (progress) => {
			progress.classList.remove('inactive');
		});
		hasShown = true;
		observer.disconnect();
	}
}

export default function Skills() {
	const skillCards = useMemo(
		() =>
			constants.map((constant, idx) => (
				<SkillCards
					key={idx}
					id={idx}
					heading={constant.heading}
					topics={constant.topics}
				/>
			)),
		[constants]
	);

	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;

		const progresses = container.getElementsByClassName('bar');
		[].forEach.call(progresses, (progress) => {
			progress.classList.add('inactive');
		});

		let hasShown = false;
		const observer = new IntersectionObserver(
			(entries) => handleInView(entries, container, hasShown, observer),
			{
				root: null,
				rootMargin: '0px',
				threshold: 1.0,
			}
		);

		const firstSkillCard = container.querySelector('.skill-container');
		observer.observe(firstSkillCard);
	}, []);

	return (
		<>
			<h1 id="myTechSkills" className={headerClass}>
				My Tech Skills
			</h1>
			<div className={skillMainClass} ref={containerRef}>
				{skillCards}
			</div>
		</>
	);
}
