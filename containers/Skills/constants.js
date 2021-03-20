import { GoMarkGithub } from 'react-icons/go';
import { BiLink, BiBookContent } from 'react-icons/bi';
import { FaPenNib } from 'react-icons/fa';
import { SiReact, SiNextDotJs, SiPostgresql, SiMongodb, SiDocker } from 'react-icons/si';
import { GrNode, GrTechnology, GrUbuntu, GrFedora } from 'react-icons/gr';
import { DiDjango, DiJavascript1, DiCss3Full, DiAws, DiGit } from 'react-icons/di';
import { IoLogoJavascript } from 'react-icons/io';

export const glossIcon = {
	// links
	github: GoMarkGithub,
	app: BiLink,
	blog: FaPenNib,

	// stacks
	nodejs: GrNode,
	reactjs: SiReact,
	nextjs: SiNextDotJs,
	css: DiCss3Full,
	js: IoLogoJavascript,

	// backends
	expressjs: DiJavascript1,
	django: DiDjango,
	mongodb: SiMongodb,
	postgresql: SiPostgresql,
	cms: BiBookContent,

	// devops
	ubuntu: GrUbuntu,
	docker: SiDocker,
	aws: DiAws,
	fedora: GrFedora,
	git: DiGit,

	other: GrTechnology,
};

export const glossColour = {
	// links
	github: '#C4F1F9',
	app: '#9ae6b4',
	blog: '#feb2b2',

	// stacks
	nodejs: 'red.400',
	reactjs: 'blue.400',
	nextjs: 'gray.400',
	css: 'blue.600',
	js: 'orange.400',

	//backends
	expressjs: 'teal.200',
	mongodb: 'green.400',
	postgresql: 'blue.600',
	django: 'gray.500',
	cms: 'yellow.200',

	// devops
	ubuntu: 'orange.600',
	docker: 'blue.500',
	aws: 'orange.900',
	fedora: 'teal.700',
	git: 'orange.700',

	other: 'black',
};

export default [
	{
		heading: 'Frontend',
		topics: [
			{
				name: 'NextJS',
				progress: 90,
			},
			{
				name: 'ReactJS',
				progress: 90,
			},
			{
				name: 'CSS',
				progress: 95,
			},
			{
				name: 'Vanilla Javascript',
				progress: 95,
				icon: 'js',
			},
		],
	},
	{
		heading: 'Backend and Databases',
		topics: [
			{
				name: 'ExpressJS',
				progress: 90,
			},
			{
				name: 'Django Rest Framework',
				progress: 65,
				icon: 'django',
			},
			{
				name: 'PostgreSQL',
				progress: 95,
			},
			{
				name: 'MongoDB',
				progress: 95,
			},
			{
				name: 'Content Management Systems',
				progress: 65,
				icon: 'cms',
			},
		],
	},
	{
		heading: 'Cloud and Devops',
		topics: [
			{
				name: 'Ubuntu',
				progress: 25,
			},
			{
				name: 'Docker',
				progress: 90,
			},
			{
				name: 'AWS',
				progress: 30,
			},
			{
				name: 'Fedora',
				progress: 40,
			},
			{
				name: 'Git',
				progress: 90,
			},
		],
	},
];
