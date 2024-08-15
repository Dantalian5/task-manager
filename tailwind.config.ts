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
            background: '#1F2937', // Un gris oscuro para el fondo
            foreground: '#D1D5DB', // Un gris claro para el texto principal
            primary: {
              foreground: '#FFFFFF', // Texto en blanco
              DEFAULT: '#3B82F6', // Azul para elementos primarios
            },
            secondary: {
              foreground: '#E5E7EB', // Gris claro para texto secundario
              DEFAULT: '#4B5563', // Gris más oscuro para elementos secundarios
            },
            success: {
              foreground: '#D1FAE5', // Verde muy claro para el texto de éxito
              DEFAULT: '#10B981', // Verde para los elementos de éxito
            },
            warning: {
              foreground: '#FFF7ED', // Naranja claro para el texto de advertencia
              DEFAULT: '#F59E0B', // Naranja para elementos de advertencia
            },
            danger: {
              foreground: '#FEE2E2', // Rojo claro para el texto de error
              DEFAULT: '#EF4444', // Rojo para elementos de error
            },
            border: '#374151', // Bordes en gris oscuro
          },
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
