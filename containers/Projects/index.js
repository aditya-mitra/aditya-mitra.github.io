import constants from './constants';
import Card from './card';

import { containerHeader as headerClass } from '@/styles/containers.module.css';

export default function Projects() {
	let count = 1;
	const cards = constants.map((constant) => {
		const { codex, items } = constant;
		const sourceItems = items.map((item) => ({
			...item,
			id: count++,
		}));
		return (
			<Card
				key={codex}
				codex={codex}
				sourceItems={sourceItems}
				links={constant.links}
				stacks={constant.stacks}
			/>
		);
	});

	return (
		<div>
			<h1 id="myProjects" className={headerClass}>
				My Projects
			</h1>
			{cards}
		</div>
	);
}
