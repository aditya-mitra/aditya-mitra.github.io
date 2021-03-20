import css from 'styled-jsx/css';

export default css`
	.progress {
		height: 10px;
		width: 20rem;
		overflow: hidden;
		background-color: #f7f7f7;
		background-image: linear-gradient(to bottom, #f5f5f5, #f9f9f9);
		background-repeat: repeat-x;
		border-radius: 4px;
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
		margin-bottom: 2px;
	}
	@media screen and (max-width: 440px) {
		.progress {
			width: 10rem;
			margin: auto;
		}
	}

	.progress .bar {
		float: left;
		width: 0;
		height: 100%;

		font-size: 10px;
		font-weight: bold;

		color: black;
		text-align: center;
		text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
		background-color: #0e90d2;
		background-image: linear-gradient(to bottom, #149bdf, #0480be);
		background-repeat: repeat-x;
		box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
		box-sizing: border-box;

		transition: width 2s ease 0.5s;
	}
	.inactive {
		width: 0 !important;
	}

	.progress .bar + .bar {
		box-shadow: inset 1px 0 0 rgba(0, 0, 0, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.15);
	}

	.progress-striped .bar {
		background-color: #149bdf;
		background-image: linear-gradient(
			45deg,
			rgba(255, 255, 255, 0.15) 25%,
			transparent 25%,
			transparent 50%,
			rgba(255, 255, 255, 0.15) 50%,
			rgba(255, 255, 255, 0.15) 75%,
			transparent 75%,
			transparent
		);
		background-size: 40px 40px;
	}

	.progress.active .bar {
		animation-name: progress-bar-stripes;
		animation-duration: 1.5s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}
	@keyframes progress-bar-stripes {
		from {
			background-position: 40px 0;
		}
		to {
			background-position: 0 0;
		}
	}

	.progress-success .bar,
	.progress .bar-success {
		background-color: #5eb95e;
		background-image: linear-gradient(to bottom, #62c462, #57a957);
		background-repeat: repeat-x;
	}

	.progress-success.progress-striped .bar,
	.progress-striped .bar-success {
		background-color: #62c462;
		background-image: linear-gradient(
			45deg,
			rgba(255, 255, 255, 0.15) 25%,
			transparent 25%,
			transparent 50%,
			rgba(255, 255, 255, 0.15) 50%,
			rgba(255, 255, 255, 0.15) 75%,
			transparent 75%,
			transparent
		);
	}
`;
