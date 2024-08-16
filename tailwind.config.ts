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
        'space-gradient': `radial-gradient(circle at 20% 20%, var(--tw-gradient-stops)),
        radial-gradient(circle at 90% 50%, var(--tw-gradient-stops), transparent 80%)`,
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
            background: {
              DEFAULT: '#0B132B', // Fondo principal: gris oscuro
              light: '#1C2541', // Fondo secundario: un poco más claro para secciones
            },
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
      },
    }),
  ],
};
export default config;
