import css from 'styled-jsx/css';

export default css`
	.container {
		width: 100%;
		padding: 0.5rem 1rem;
	}

	.module {
		position: relative;
		z-index: 1;
		display: block;
		background: #ffffff;
		min-width: 200px;
		width: 100%;
		height: 470px;
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
		transition: all 0.5s linear 0s;
	}

	.module:hover {
		box-shadow: 0px 1px 35px 0px rgba(0, 0, 0, 0.3);
	}
	.module:hover .content {
		opacity: 0.8;
		align-items: center;
	}
	.dark:hover .content {
		opacity: 0.7;
	}
	.module:hover .content .title {
		font-size: 2em;
	}
	.module:hover .content .description {
		height: auto !important;
		visibility: visible;
		opacity: 1 !important;

		transition: all 1s linear;
	}
	.module:hover .thumbnail {
		height: 100%;
		background: none;
	}
	.module:hover .thumbnail img {
		transform: scale(1.2);
		opacity: 0.8;
		height: 100%;
		top: 0;
	}

	.module .thumbnail {
		position: relative;
		background: #000;
		height: 215px;
		overflow: hidden;

		background: url('/images/about-fallback.webp') whitesmoke;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	.module .thumbnail img {
		position: absolute;
		height: auto;
		width: 120%;
		display: block;
		transition: all 0.3s linear;
	}
	.dark .thumbnail img {
		filter: invert(1) hue-rotate(180deg);
	}

	.module .content {
		position: absolute;
		bottom: 0;
		background: #ffffff;
		border-radius: 10px;
		width: 100%;
		padding: 0 1rem;
		box-sizing: border-box;
		transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
	}
	.module .content .title {
		margin: 0;
		padding: 0 0 10px;
		color: #333333;
		font-family: 'Vampiro One', cursive;
		font-size: 4em;
		font-weight: 700;
	}
	.module .content .sub-title {
		margin: 0;
		padding: 0 0 20px;
		color: #e74c3c;
		font-family: 'Concert One', sans-serif;
		font-size: 20px;
		font-weight: 400;
	}
	.module .content .description {
		display: block;
		height: 0;
		visibility: hidden;
		text-align: center;

		color: #666666;
		font-family: 'Righteous', cursive;
		font-size: 1rem;
		font-weight: bold;
	}
	.module .content .meta-status {
		margin: 30px 0 0;
		color: #999999;
	}
`;
