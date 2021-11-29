import { encodeUriParam } from './utils/uriParams'

/* eslint-disable */
const yaml = require('js-yaml')
const fs = require('fs')

const cleanupIDs = require('svgo/plugins/cleanupIDs')
const removeAttrs = require('svgo/plugins/removeAttrs')
const removeDimensions = require('svgo/plugins/removeDimensions')
const removeViewBox = require('svgo/plugins/removeViewBox')
const inlineStyles = require('svgo/plugins/inlineStyles')
const inlineDefs = require('@nuxtjs/svg-sprite/lib/plugins/inlineDefs.js')
const removeUselessStrokeAndFill = require('svgo/plugins/removeUselessStrokeAndFill.js')
const cleanupAttrs = require('svgo/plugins/cleanupAttrs.js')
const removeComments = require('svgo/plugins/removeComments.js')
const removeTitle = require('svgo/plugins/removeTitle.js')
const removeDesc = require('svgo/plugins/removeDesc.js')
const removeUselessDefs = require('svgo/plugins/removeUselessDefs.js')
const removeMetadata = require('svgo/plugins/removeMetadata.js')
const removeEditorsNSData = require('svgo/plugins/removeEditorsNSData.js')
const removeEmptyAttrs = require('svgo/plugins/removeEmptyAttrs.js')
const removeHiddenElems = require('svgo/plugins/removeHiddenElems.js')
const removeEmptyText = require('svgo/plugins/removeEmptyText.js')
const removeEmptyContainers = require('svgo/plugins/removeEmptyContainers.js')
const minifyStyles = require('svgo/plugins/minifyStyles.js')
const removeUnknownsAndDefaults = require('svgo/plugins/removeUnknownsAndDefaults.js')
/* eslint-enable */

function defaultPlugins() {
	removeAttrs.active = true
	removeAttrs.params.attrs = '(id|stroke|fill)'
	removeViewBox.active = false
	removeDimensions.active = true
	inlineStyles.active = true
	removeUselessStrokeAndFill.active = true
	cleanupAttrs.active = true
	removeComments.active = true
	removeTitle.active = true
	removeDesc.active = true
	removeUselessDefs.active = true
	removeMetadata.active = true
	removeEditorsNSData.active = true
	removeEmptyAttrs.active = true
	removeHiddenElems.active = true
	removeEmptyText.active = true
	removeEmptyContainers.active = true
	minifyStyles.active = true
	removeUnknownsAndDefaults.active = true
	cleanupIDs.active = false

	return [
		removeDimensions,
		cleanupIDs,
		removeAttrs,
		removeViewBox,
		inlineStyles,
		cleanupAttrs,
		removeComments,
		removeTitle,
		removeDesc,
		removeUselessDefs,
		removeMetadata,
		removeEditorsNSData,
		removeEmptyAttrs,
		removeHiddenElems,
		removeEmptyText,
		removeEmptyContainers,
		minifyStyles,
		removeUnknownsAndDefaults,
		{ inlineDefs }, // NOTE: it's important to pass custom plugins as object.
	]
}

const title = 'MLOps Toys | A Curated List of Machine Learning Projects'
const description =
	'Check out this curated list of the most useful MLOps tools, projects and more. Have something to add? Let us know!'
export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: true,

	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	generate: {
		fallback: true,
		routes() {
			const projectsJSON = yaml.load(fs.readFileSync('./store/data/projects.yaml', 'utf8'))
			const categories = [...new Set(projectsJSON.map((project) => project.category))]

			return categories.map((category) => `/${encodeUriParam(category)}`)
		},
	},

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title,
		meta: [
			// Default
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: 'theme-color', content: '#ffffff' },
			{ name: 'msapplication-config', content: '/favicons/browserconfig.xml' },
			{ name: 'msapplication-TileColor', content: '#48cfad' },
			{
				'http-equiv': 'Cache-Control',
				content: 'no-cache, no-store, must-revalidate',
			},
			{ 'http-equiv': 'Pragma', content: 'no-cache' },
			{ 'http-equiv': 'Expires', content: '0' },
			// Title
			{
				name: 'title',
				content: title,
			},
			{
				name: 'og:title',
				content: title,
			},
			{
				name: 'twitter:title',
				content: title,
			},
			// Description
			{
				hid: 'description',
				name: 'description',
				content: description,
			},
			{
				hid: 'og:description',
				name: 'og:description',
				content: description,
			},
			{
				hid: 'twitter:description',
				name: 'twitter:description',
				content: description,
			},
			// Other
			{
				name: 'og:type',
				content: 'website',
			},
			{
				name: 'og:url',
				content: 'https://mlops.toys',
			},
			{
				name: 'twitter:url',
				content: 'https://mlops.toys',
			},
			{
				name: 'keywords',
				content:
					'mlops, mlops tools, machine learning, production machine learning, awesome mlops, awesome machine learning',
			},
			{
				name: 'og:image',
				content: 'https://mlops.toys/images/seo/image.png',
			},
			{
				name: 'twitter:image',
				content: 'https://mlops.toys/images/seo/twitter-image.png',
			},
			{
				name: 'twitter:card',
				content: 'summary_large_image',
			},
		],
		link: [
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/favicons/apple-touch-icon.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicons/favicon-32x32.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicons/favicon-16x16.png',
			},
			{ rel: 'manifest', href: '/favicons/site.webmanifest' },
			{
				rel: 'mask-icon',
				href: '/favicons/safari-pinned-tab.svg',
				color: '#48cfad',
			},
			{ rel: 'shortcut icon', href: '/favicons/favicon.ico' },
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{
			src: './plugins/gtag.js',
			mode: 'client',
		},
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/stylelint
		'@nuxtjs/stylelint-module',
		// https://go.nuxtjs.dev/tailwindcss
		'@nuxtjs/tailwindcss',
		'@nuxtjs/svg-sprite',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		'@nuxtjs/markdownit',
		'@nuxtjs/gtm',
	],

	gtm: {
		id: 'GTM-53TSBBF',
	},

	svgSprite: {
		input: '~/assets/icons',
		svgoConfig() {
			return {
				plugins: defaultPlugins(),
			}
		},
	},

	tailwindcss: {
		cssPath: '~/assets/styles/tailwind.scss',
		configPath: 'tailwind.config.js',
	},

	markdownit: {
		runtime: true,
	},

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'en',
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		extend(config, ctx) {
			config.module.rules.push({
				enforce: 'pre',
				test: /\.yaml$/,
				loader: 'raw-loader',
				exclude: /(node_modules)/,
			})
		},
	},
}
