import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	plugins: [require('@tailwindcss/forms')],
	theme: {
		extend: {
			gridTemplateColumns: {
				// Simple 20
				'20': 'repeat(20, minmax(0, 1fr))',
			},
		},
	},
}
export default config
