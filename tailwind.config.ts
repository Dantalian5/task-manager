import { card } from '@nextui-org/react';
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
      boxShadow: {
        bottom:
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);',
        right:
          '4px 0 6px -1px rgb(0 0 0 / 0.1), 2px 0 4px -2px rgb(0 0 0 / 0.1);',
      },
      backgroundImage: {
        'space-gradient':
          'radial-gradient(circle at top left, var(--tw-gradient-stops), transparent 80%), radial-gradient(circle at 110% 60%, var(--tw-gradient-stops), transparent 50%)',
        'card-gradient':
          'radial-gradient(circle at top left, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: {
              DEFAULT: '#EAF4FC', // Azul cielo claro suave
              light: '#FFFFFF', // Blanco puro, ideal para áreas destacadas
            },
            foreground: '#334E68',
            primary: {
              foreground: '#FFFFFF',
              DEFAULT: '#3A86FF',
            },
            secondary: {
              foreground: '#FFFFFF',
              DEFAULT: '#6B7280',
            },
            success: {
              foreground: '#E8FDF5',
              DEFAULT: '#06D6A0',
            },
            warning: {
              foreground: '#FFFFFF',
              DEFAULT: '#F59E0B',
            },
            danger: {
              foreground: '#FFFFFF',
              DEFAULT: '#EF4444',
            },
            border: '#D1E1EB',
            card: {
              DEFAULT: '#FFFFFF',
              light: '#F9FAFB',
            },
          },
        },
        dark: {
          colors: {
            background: {
              DEFAULT: '#0A0F1F',
              light: '#16203A',
            },
            foreground: '#E5E7EB',
            primary: {
              foreground: '#FFFFFF',
              DEFAULT: '#2563EB',
            },
            secondary: {
              foreground: '#FFFFFF',
              DEFAULT: '#9CA3AF',
            },
            success: {
              foreground: '#D1FAE5',
              DEFAULT: '#10B981',
            },
            warning: {
              foreground: '#FFF7ED',
              DEFAULT: '#F59E0B',
            },
            danger: {
              foreground: '#FEE2E2',
              DEFAULT: '#EF4444',
            },
            border: '#2D3748',
            card: {
              DEFAULT: '#16203A',
              light: '#1E2A47',
            },
          },
        },
      },
    }),
  ],
};
export default config;
