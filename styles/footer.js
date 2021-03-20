import css from 'styled-jsx/css';

const allStyles = css`
	.footer {
		display: grid;
		position: relative;
		grid-template-columns: 2fr 1fr;
		background-color: aliceblue;
		font-family: 'Barlow', sans-serif;
		height: 7rem;
		padding-bottom: 5rem;
		color: black;
		overflow: hidden;
	}
	@media screen and (max-width: 590px) {
		.footer {
			height: 16.5rem;
			grid-template-columns: 1fr;
		}
	}
	.dark {
		filter: invert(1) hue-rotate(180deg);
	}

	.contact-container {
		max-width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex;
		align-items: center;
	}

	.header {
		display: block;
		font-size: 2em;
		text-align: center;
	}

	.contact-icons {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 1rem 0;
	}

	.built-with {
		position: relative;
		font-size: 2em;
		font-weight: 100;
		height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	@media screen and ((max-width: 1082px) and (min-width: 590px)) {
		.built-with {
			font-size: 1.5em;
		}
	}
	@media screen and (max-width: 350px) {
		.built-with {
			margin: 1.5rem 0;
			font-size: 1.5em;
		}
	}
	.built-with .border {
		position: absolute;
		align-self: flex-start;
		justify-self: center;
		height: 50%;
		border-left: 1px solid black;
		opacity: 0.5;
	}
	@media screen and (max-width: 590px) {
		.built-with .border {
			display: none;
		}
	}
	.built-with span {
		font-weight: 200;
		display: inline;
	}
	.built-with .built {
		display: block;
		margin: 0.25rem 1rem;
	}
	@media screen and (max-width: 590px) {
		.built-with .built {
			margin: 0 1rem;
		}
	}
`;

export default allStyles;
