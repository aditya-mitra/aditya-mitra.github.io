import { AiOutlineConsoleSql, AiTwotoneHtml5 } from 'react-icons/ai';
import { BiBookContent, BiLink } from 'react-icons/bi';
import { BsFillTerminalFill } from 'react-icons/bs';
import { DiAws, DiCss3Full, DiDjango, DiGit, DiJava } from 'react-icons/di';
import { FaPenNib } from 'react-icons/fa';
import { FiCoffee } from 'react-icons/fi';
import { GiRobotHelmet } from 'react-icons/gi';
import { GoMarkGithub } from 'react-icons/go';
import { GrFedora, GrNode, GrTechnology, GrUbuntu } from 'react-icons/gr';
import { IoBrowsersOutline, IoLogoJavascript, IoLogoPython } from 'react-icons/io5';
import {
	SiC,
	SiCircleci,
	SiDocker,
	SiGithubactions,
	SiJavascript,
	SiJest,
	SiMongodb,
	SiNextDotJs,
	SiPostgresql,
	SiPython,
	SiReact,
	SiTypescript,
} from 'react-icons/si';

export const glossIcon = {
	// links
	github: GoMarkGithub,
	app: BiLink,
	blog: FaPenNib,

	// frontend
	nodejs: GrNode,
	reactjs: SiReact,
	nextjs: SiNextDotJs,
	css: DiCss3Full,
	js: IoLogoJavascript,

	// backends
	expressjs: SiJavascript,
	django: DiDjango,
	cms: BiBookContent,
	hapijs: GiRobotHelmet,
	koajs: IoLogoJavascript,

	// databases
	mongodb: SiMongodb,
	postgresql: SiPostgresql,
	indexeddb: AiTwotoneHtml5,
	sqlite3: AiOutlineConsoleSql,

	// devops
	actions: SiGithubactions,
	circleci: SiCircleci,
	ubuntu: GrUbuntu,
	docker: SiDocker,
	aws: DiAws,
	fedora: GrFedora,
	git: DiGit,

	// testing
	cypress: IoBrowsersOutline,
	jest: SiJest,
	chaimocha: FiCoffee,
	pythontesting: IoLogoPython,
	shell: BsFillTerminalFill,

	// programming languages
	java: DiJava,
	typescript: SiTypescript,
	cpp: SiC,
	python: SiPython,

	other: GrTechnology,
};

export const glossColour = {
	// links
	github: '#C4F1F9',
	app: '#9ae6b4',
	blog: '#feb2b2',

	// frontend
	nodejs: 'red.400',
	reactjs: 'blue.400',
	nextjs: 'gray.400',
	css: 'blue.600',
	js: 'orange.400',

	//backends
	expressjs: 'teal.200',
	django: 'gray.500',
	cms: 'yellow.200',
	hapijs: 'orange.500',
	koajs: 'teal.400',

	//databases
	mongodb: 'green.400',
	postgresql: 'blue.600',
	indexeddb: 'orange.300',
	sqlite3: 'cyan.400',

	// devops
	actions: 'green.900',
	circleci: 'teal.900',
	ubuntu: 'orange.600',
	docker: 'blue.500',
	aws: 'orange.900',
	fedora: 'teal.700',
	git: 'orange.700',

	// testing
	cypress: 'pink.900',
	jest: 'pink.600',
	chaimocha: 'yello.200',
	pythontesting: 'blue.800',
	shell: 'green.500',

	// programming languages
	java: 'red.500',
	typescript: 'blue.300',
	cpp: 'purple.800',
	python: 'cyan.900',

	other: 'black',
};

export default [
	{
		heading: 'DevOps and Cloud',
		topics: [
			{
				name: 'GitHub Actions',
				progress: 90,
				icon: 'actions',
			},
			{
				name: 'CircleCI',
				progress: 85,
			},
			{
				name: 'Docker',
				progress: 90,
			},
			{
				name: 'AWS',
				progress: 87,
			},
			{
				name: 'Git',
				progress: 90,
			},
			{
				name: 'Ubuntu',
				progress: 85,
			},
		],
	},
	{
		heading: 'Backend',
		topics: [
			{
				name: 'ExpressJS',
				progress: 94,
			},
			{
				name: 'Django',
				progress: 93,
				icon: 'django',
			},
			{
				name: 'Content Management Systems',
				progress: 75,
				icon: 'cms',
			},
			{
				name: 'HapiJS',
				progress: 75,
			},
			{
				name: 'KoaJS',
				progress: 50,
			},
		],
	},
	{
		heading: 'Frontend',
		topics: [
			{
				name: 'NextJS',
				progress: 95,
			},
			{
				name: 'ReactJS',
				progress: 95,
			},
			{
				name: 'CSS/SCSS',
				progress: 94,
				icon: 'css',
			},
			{
				name: 'Vanilla Javascript',
				progress: 93,
				icon: 'js',
			},
		],
	},
	{
		heading: 'DataBases',
		topics: [
			{
				name: 'MongoDB',
				progress: 97,
			},
			{
				name: 'PostgreSQL',
				progress: 92,
			},
			{
				name: "IndexedDB (Browser's Database)",
				progress: 87,
				icon: 'indexeddb',
			},
			{
				name: 'SQLite3',
				progress: 50,
			},
		],
	},
	{
		heading: 'Testing and Automation',
		topics: [
			{
				name: 'Cypress',
				progress: 90,
			},
			{
				name: 'Jest',
				progress: 95,
			},
			{
				name: 'Mocha and Chai',
				progress: 75,
				icon: 'chaimocha',
			},
			{
				name: 'Python UnitTesting Framework',
				progress: 78,
				icon: 'pythontesting',
			},
			{
				name: 'Shell',
				progress: 85,
			},
		],
	},
	{
		heading: 'Programming Languages',
		topics: [
			{
				name: 'C++',
				progress: 92,
				icon: 'cpp',
			},
			{
				name: 'JavaScript/TypeScript',
				progress: 97,
				icon: 'typescript',
			},
			{
				name: 'Python',
				progress: 90,
			},
			{
				name: 'Java',
				progress: 70,
			},
		],
	},
];
