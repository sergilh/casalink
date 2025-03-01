/** @type {import('tailwindcss').Config} */
export const darkMode = ['class'];
export const theme = {
	colors: {
		border: 'hsl(var(--border))',
		input: 'hsl(var(--input))',
		ring: 'hsl(var(--ring))',
		background: 'hsl(var(--background))',
		foreground: 'hsl(var(--foreground))',
		primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))',
		},
		secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))',
		},
		destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))',
		},
		muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))',
		},
		accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))',
		},
		popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))',
		},
		card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))',
		},
	},
	borderRadius: {
		lg: 'var(--radius)',
		md: 'calc(var(--radius) - 2px)',
		sm: 'calc(var(--radius) - 4px)',
	},
	fontSize: {
		sm: '0.64rem',
		tiny: '0.8rem',
		base: '1rem',
		lg: '1.25rem',
		xl: '1.56rem',
		'2xl': '1.95rem',
		'3xl': '2.44rem',
		'4xl': '3.05rem',
		'5xl': '3.81rem',
		'6xl': '4.77rem',
		'7xl': '5.96rem',
	},
	fontFamily: {
		titles: 'ArtLab, Montserrat, "Open Sans", sans-serif',
		body: '"Open Sans", sans-serif',
	},
};
