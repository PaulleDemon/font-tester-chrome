/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	important: false,
	content: [
		"./src/**/*.{html,jsx, js}",
		"./src/**/*.js",
		"./src/**/*.html",
		"./dist/*.html"
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
			
			}
		},
	},
	plugins: [],
}

