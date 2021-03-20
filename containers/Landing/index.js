import Header from './header';
import Navbar from './navbar';

import { landing as landingClass } from '@/styles/containers.module.css';

export default function LandingIndex() {
	return (
		<>
			<span id="pageLanding" style={{ visibility: 'hidden' }} />
			<div className={landingClass}>
				<Header />
				<Navbar />
			</div>
		</>
	);
}
