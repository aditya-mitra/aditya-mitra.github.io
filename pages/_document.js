import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

class MyDocument extends NextDocument {
	static async getInitialProps(ctx) {
		const initialProps = await NextDocument.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					{/* generics */}
					<link rel="icon" href="/favicons/32.ico" sizes="32x32" />
					<link rel="icon" href="/favicons/76.ico" sizes="76x76" />
					<link rel="icon" href="/favicons/128.ico" sizes="128x128" />
					<link rel="icon" href="/favicons/228.ico" sizes="228x228" />
					{/* Android */}
					<link rel="shortcut icon" href="/favicons/128.ico" sizes="196x196" />
					{/* iOS */}
					<link rel="apple-touch-icon" href="/favicons/76.ico" sizes="120x120" />
				</Head>
				<body>
					<ColorModeScript initialColorMode="system" />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
