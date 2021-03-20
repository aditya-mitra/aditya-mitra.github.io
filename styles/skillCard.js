import css from 'styled-jsx/css';

const allStyles = css`
	.skill-container {
		background: aliceblue;
		border: 1px solid blue;
		border-radius: 0.8rem;
		width: 90%;
		font-family: 'Staatliches', cursive;

		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;

		box-shadow: 0 0 20px 6px#336699;
		padding: 0.5rem 0 1rem 0;
		transition: all 1.5s cubic-bezier(0.03, 0.98, 0.52, 0.99);
	}
	@media screen and (max-width: 440px) {
		.skill-container {
			width: 100%;
			margin: 0;
		}
	}
	.dark {
		filter: invert(1) hue-rotate(180deg);
	}
	.dark .skill-header {
		filter: invert(1) hue-rotate(180deg);
	}
	.skill-header {
		margin: 0.5rem;
		font-size: 1.2em;
	}
`;

const topicStyles = css`
	.skill-progress {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0.5rem 0;
		width: 100%;
	}
	.skill-progress p {
		margin-top: -0.1rem;

		display: flex;
		justify-content: center;

		width: 20rem;
		font-family: 'Fira Sans', serif;
		font-size: 1rem;
		font-weight: 500;
		font-style: italic;
	}
	.dark p {
		filter: invert(1) hue-rotate(180deg);
		color: white;
	}
`;

export { allStyles, topicStyles };
