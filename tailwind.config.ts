import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        '250': '250px',
        '300': '300px',
        '320': '320px',
      },
      height: {
        '300': '300px',
        '320': '320px',
        '600': '600px',
      },
      minHeight: {
        '600': '600px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'custom-size': '850px 450px',
      },
      colors: {
        'custom-gray': 'rgb(215, 215, 215)',
        'custom-light-gray': 'rgb(183, 183, 183)',
        'custom-purple': 'rgb(186, 128, 217)',
      },
      maxWidth: {
        '1440px': '1440px',
        '360': '360px',
      },
    },
  },
  plugins: [],
};
export default config;
