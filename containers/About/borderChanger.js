import styles from '@/styles/borderChanger';

export default function BorderChanger() {
	return (
		<>
			<style jsx>{styles}</style>
			<div className="container" data-cy="border-animation">
				<div className="border-changer" />
			</div>
		</>
	);
}
