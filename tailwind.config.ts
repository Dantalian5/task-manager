import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: '#F7F8FA',
            foreground: '#2E2E2E',
            primary: {
              foreground: '#FFFFFF',
              DEFAULT: '#3B82F6',
            },
            secondary: {
              foreground: '#FFFFFF',
              DEFAULT: '#6B7280',
            },
            success: {
              foreground: '#FFFFFF',
              DEFAULT: '#10B981',
            },
            warning: {
              foreground: '#FFFFFF',
              DEFAULT: '#F59E0B',
            },
            danger: {
              foreground: '#FFFFFF',
              DEFAULT: '#EF4444',
            },
            border: '#E5E7EB', // Bordes en gris claro
          },
        },
        dark: {
          colors: {
            background: '#000000', // or DEFAULT
            foreground: '#ECEDEE', // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: '#FFFFFF',
              DEFAULT: '#006FEE',
            },
          },
          // ... rest of the colors
        },
        mytheme: {
          // custom theme
          extend: 'dark',
          colors: {
            primary: {
              DEFAULT: '#BEF264',
              foreground: '#000000',
            },
            focus: '#BEF264',
          },
        },
      },
    }),
  ],
};
export default config;
