import css from 'styled-jsx/css';

export default css`
	.container {
		margin: 5px 0px 0 10px;
		width: auto;
		height: auto;
		filter: hue-rotate(180deg);

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.border-changer {
		height: 350px;
		width: 350px;
		background-color: blue;
		animation: border-radius-change 15s linear 0s infinite alternate both;
	}
	@media screen and (max-width: 400px) {
		.border-changer {
			margin-top: 10px;
			height: 250px;
			width: 250px;
		}
	}

	@keyframes border-radius-change {
		0% {
			border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
			background: #aa4b6b;
		}
		16.67% {
			border-radius: 75% 25% 75% 25% / 75% 25% 75% 25%;
			background: #fc6767;
		}
		33.34% {
			border-radius: 25% 75% 25% 75% / 25% 25% 75% 75%;
			background: #3e5151;
		}
		50.51% {
			border-radius: 75% 25% 25% 75% / 75% 75% 25% 25%;
			background: #22c1c3;
		}
		66.68% {
			border-radius: 25% 75% 75% 25% / 75% 25% 75% 25%;
			background: #a5cc82;
		}
		83.35% {
			border-radius: 25% 75% 25% 75% / 25% 75% 25% 75%;
			background: #2c3e50;
		}
		100% {
			border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
			background: #ffe259;
		}
	}
`;
