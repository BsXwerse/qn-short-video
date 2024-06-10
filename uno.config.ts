import {
	defineConfig,
	presetIcons,
	presetUno,
	presetAttributify,
} from 'unocss';

export default defineConfig({
	presets: [presetUno(), presetIcons(), presetAttributify()],
	content: {
		filesystem: ['**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}'],
	},
	shortcuts: {
		'absolute-center':
			'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
		'flex-center-box': 'flex w-full h-full items-center justify-center',
	},
	theme: {
		colors: {
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))',
			},
		},
	},
});
