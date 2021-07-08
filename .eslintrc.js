module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	extends: ['@nuxtjs', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
	plugins: [],
	// add your custom rules here
	rules: {
		'prettier/prettier': [
			'warn',
			{
				singleQuote: true,
				semi: false,
				trailingComma: 'all',
				useTabs: true,
				tabWidth: 4,
				printWidth: 120,
				endOfLine: 'auto',
			},
		],
	},
}
