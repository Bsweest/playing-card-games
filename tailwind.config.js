/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				default: '"Montserrat", sans-serif'
			},
			colors: {
				primary: '#6200EE',
				variant: '#3700B3',
				secondary: '#03DAC6'
			}
		}
	},
	plugins: []
};
