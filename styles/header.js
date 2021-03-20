import css from 'styled-jsx/css';

export const headerBoxStyes = css`
	.box {
		position: absolute;
		top: 47%;
		left: 50%;
		bottom: 2rem;
		transform: translateX(-50%) translateY(-50%); /* scale up when device viewport decreases */
		padding: 3rem;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		width: 100%;
		height: 100%;
	}

	.wrapper {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
	}

	.box svg {
		align-self: center;
		width: 100%;
		height: auto;
		background-size: cover;
	}

	#word-mitra {
		margin-top: 2rem;
	}

	.ball {
		fill: orange;
	}
`;
