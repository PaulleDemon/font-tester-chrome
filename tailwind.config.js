/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	important: false,
	content: [
		"./src/**/*.{html,jsx, js}",
		"./src/**/*.js",
		"./src/**/*.html",
		// "./dist/*.html"
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
			
			},
			fontSize: {
				xs: ['12px', { lineHeight: '16px' }],
				sm: ['14px', { lineHeight: '20px' }],
				base: ['16px', { lineHeight: '24px' }],
				lg: ['18px', { lineHeight: '28px' }],
				'xl': ['20px', { lineHeight: '28px' }],
				'2xl': ['24px', { lineHeight: '32px' }],
				'3xl': ['30px', { lineHeight: '36px' }],
				'4xl': ['36px', { lineHeight: '40px' }],
				'5xl': ['48px', { lineHeight: '16px' }],
				'6xl': ['60px', { lineHeight: '16px' }],
				'7xl': ['72px', { lineHeight: '16px' }],
			  },
			  spacing: {
				px: '1px',
				0: '0',
				0.5: '2px',
				1: '4px',
				1.5: '6px',
				2: '8px',
				2.5: '10px',
				3: '12px',
				3.5: '14px',
				4: '16px',
				5: '20px',
				6: '24px',
				7: '28px',
				8: '32px',
				9: '36px',
				10: '40px',
				11: '44px',
				12: '48px',
				14: '56px',
				16: '64px',
				20: '80px',
				24: '96px',
				28: '112px',
				32: '128px',
				36: '144px',
				40: '160px',
				44: '176px',
				48: '192px',
				52: '208px',
				56: '224px',
				60: '240px',
				64: '256px',
				72: '288px',
				80: '320px',
				96: '384px',
			  },
		
		},
	},
	
	plugins: [],
}

