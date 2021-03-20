import { GoMarkGithub } from 'react-icons/go';
import { BiLink } from 'react-icons/bi';
import { FaPenNib } from 'react-icons/fa';
import {
	SiReact,
	SiNextDotJs,
	SiPostgresql,
	SiMongodb,
	SiRedux,
	SiReactrouter,
	SiMarkdown,
	SiHtml5,
	SiNetlify,
	SiDjango,
	SiFirebase,
	SiStrapi,
	SiSocketDotIo,
	SiServerless,
	SiAmazonaws,
} from 'react-icons/si';
import { GrTechnology, GrCss3, GrNode } from 'react-icons/gr';
import { CgWebsite } from 'react-icons/cg';
import { IoLogoJavascript } from 'react-icons/io';
import { IoLogoAmplify } from 'react-icons/io5';
import { ImCodepen } from 'react-icons/im';
import { BsFillTriangleFill } from 'react-icons/bs';
import { GiSamusHelmet } from 'react-icons/gi';

export const glossIcon = {
	// links
	github: GoMarkGithub,
	app: BiLink,
	blog: FaPenNib,
	vercel: BsFillTriangleFill,
	netlify: SiNetlify,
	firebase: SiFirebase,
	codepen: ImCodepen,
	amplify: IoLogoAmplify,

	// stacks
	html: SiHtml5,
	css: GrCss3,
	javascript: IoLogoJavascript,

	nodejs: GrNode,
	expressjs: GrNode,
	reactjs: SiReact,
	redux: SiRedux,
	nextjs: SiNextDotJs,
	'react router': SiReactrouter,
	hapijs: GiSamusHelmet,
	socketio: SiSocketDotIo,

	strapi: SiStrapi,
	django: SiDjango,
	postgresql: SiPostgresql,
	mongodb: SiMongodb,
	lambda: SiServerless,
	aws: SiAmazonaws,

	website: CgWebsite,
	markdown: SiMarkdown,

	other: GrTechnology,
};

export const glossColour = {
	// links
	github: '#C4F1F9',
	app: '#9ae6b4',
	blog: '#feb2b2',
	netlify: '#00b3b3',
	firebase: '#ff6600',
	codepen: '#001a4d',
	vercel: '#000099',

	// stacks
	html: 'green.300',
	css: 'blue.200',
	javascript: 'orange.400',

	nodejs: 'green.400',
	expressjs: 'gray.600',
	reactjs: 'blue.700',
	redux: 'purple.700',
	nextjs: 'gray.800',
	'react router': 'cyan.200',
	hapijs: 'orange.500',
	strapi: 'purple.300',
	socketio: 'gray.900',

	django: 'green.700',
	postgresql: 'cyan.700',
	mongodb: 'teal.500',
	amplify: 'yellow.500',
	lambda: 'orange.600',
	aws: 'yellow.600',

	website: 'yellow.400',
	markdown: 'pink.400',
};

export default [
	{
		codex: 'fthy',
		items: [
			{
				title: 'Featherify',
				description:
					'Dynamically generate an image subsitute for your code. This was the winner project of AWS Amplify + Hashnode Hackathon.',
				imgSrc:
					'https://res.cloudinary.com/gamersinstinct7/image/upload/v1616272533/portfolio/Featherify/featherify_logo_ake77f.png',
			},
			{
				title: 'Use in WebApp',
				description:
					'The Playground of Featherify can either generate css code or base64. The placeholder subsitutes in this site were generated here.',
				imgSrc:
					'https://res.cloudinary.com/gamersinstinct7/image/upload/v1616272535/portfolio/Featherify/working_featherify_webapp_vbtnbf.png',
			},
			{
				title: 'Use via API',
				description:
					'Featherify even offers an API which can dynamically generate images during build time. More information about this can be found on the blog post.',
				imgSrc:
					'https://res.cloudinary.com/gamersinstinct7/image/upload/v1616272534/portfolio/Featherify/home_page_featherify_otzrfi.png',
			},
		],
		links: [
			{
				provider: 'amplify',
				link: 'https://prod.dgy94qrrhr9xz.amplifyapp.com/play',
			},
			{
				provider: 'blog',
				link: 'https://adityamitra.hashnode.dev/featherify-the-image-substitute-generator',
			},
			{
				provider: 'github',
				link: 'https://github.com/aditya-mitra/featherify',
			},
		],
		stacks: ['django', 'pillow', 'amplify', 'lambda', 'reactjs'],
	},
	{
		codex: 'dscw',
		items: [
			{
				title: 'New DSC KIIT WebSite',
				description:
					"Lead Developer of our Club's new Website. Remade the whole site from scratch integrating whole new features.",
				imgSrc:
					'https://res.cloudinary.com/gamersinstinct7/image/upload/v1616268076/portfolio/New%20DSC%20KIIT%20Website/dsc_kiit_siteshot_zjjira.jpg',
			},
			{
				title: 'Quizzes',
				description:
					'It also has a live quiz system which has live feedback and live update. Badges are issued automatically when the score resets.',
				imgSrc:
					'https://res.cloudinary.com/gamersinstinct7/image/upload/v1616268075/portfolio/New%20DSC%20KIIT%20Website/quiz_playground_dsc_kiit_fafinx.jpg',
			},
		],
		links: [
			{
				provider: 'github',
				link: 'https://github.com/DSC-KIIT/dsckiit-website-2.0',
			},
			{
				provider: 'website',
				link: 'https://dsckiit.tech/',
			},
		],
		stacks: ['strapi', 'aws', 'hapijs', 'socketio', 'nextjs'],
	},
	{
		codex: 'cr',
		items: [
			{
				title: 'Code Rush',
				description:
					'This was the runner-up project (2nd) for a hackathon conducted in my college during the pandemic lockdown.',
				imgSrc:
					'https://res.cloudinary.com/gamersinstinct7/image/upload/c_scale,h_300,q_100,w_300/v1604304531/portfolio/Code%20Rush/cr-1_pd3aak.webp',
			},
			{
				title: 'I was the Lead Developer',
				description:
					'A competive coding platform featuring live submission feedbacks, leaderboard, a powerful code editor, supporting 6 languages, admin panel, discussions, plus some more integrations.',
				imgSrc:
					'https://res.cloudinary.com/gamersinstinct7/image/upload/c_scale,h_300,q_100,w_300/v1604304531/portfolio/Code%20Rush/cr-3_mct9ev.webp',
			},
		],
		links: [
			{
				provider: 'github',
				link: 'https://github.com/aditya-mitra/code-rush',
			},
			{
				provider: 'vercel',
				link: 'https://code-rush.vercel.app/',
				darkModeColour: 'gray.600',
			},
		],
		stacks: ['nextjs', 'nodejs', 'mongodb', 'markdown'],
	},
	{
		codex: 'whatster',
		items: [
			{
				title: 'Whatster',
				description:
					"WhatsTer is a Chat bot created using Twilio's Messaging API for Whatsapp. If you would like to store messages from your chats in whatsapp itself, this bot can come very handy.",
				imgSrc:
					'https://res.cloudinary.com/gamersinstinct7/image/upload/c_scale,h_300,q_100,w_300/v1604068045/portfolio/Whatster/Whatster_chats_1_dy9iv5.webp',
			},
			{
				title: 'Whatster',
				description:
					'It has a lot of features integrated into it. It has chat based mail service, image recognition, content saving feature all built to a single app, yet this bot is very simple to use.',
				imgSrc:
					'https://res.cloudinary.com/gamersinstinct7/image/upload/c_scale,h_300,q_100,w_300/v1604067858/portfolio/Whatster/Whatster_login_lskciw.webp',
			},
			{
				title: 'Whatster',
				description:
					'Whatster will save your messages on its database and let you secure them with your account. It will send you an OTP for you to login into its webapp.',
				imgSrc:
					'https://res.cloudinary.com/gamersinstinct7/image/upload/c_scale,h_300,q_100,w_300/v1604067858/portfolio/Whatster/Whatster_website_og7dmd.webp',
			},
		],
		links: [
			{
				provider: 'github',
				link: 'https://github.com/aditya-mitra/whatster',
			},
			{
				provider: 'firebase',
				link: 'https://whatster.web.app/',
			},
			{
				provider: 'blog',
				link: 'https://dev.to/adityamitra/whatster-the-chatbot-i-built-for-twilio-9ok',
			},
		],
		stacks: ['expressjs', 'reactjs', 'twilio', 'mongodb', 'react router'],
	},
];
