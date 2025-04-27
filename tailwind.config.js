/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': {'max': '1560px'},
        '2xl': {'max': '1462px'},
        'sro': {'max': '1400px'},
        'lt-lg': {'max': '1279px'},
        // => screen and (max-width: 1279px) { ... }

        'c-lg': {'max': '1174px'},

        'lt-md': {'max': '959px'},
        // => screen and (max-width: 959px{ ... }

        'lt-sm': {'max': '599px'},
        // => screen and (max-width: 599px) { ... }

        'md': {'max': '1279px', 'min': '960px'},
        // => screen and (min-width: 960px) and (max-width: 1279px) { ... }

        'xs': {'max': '599px'},
        // => screen and (max-width: 599px) { ... }

      },
    },
  },
  plugins: [],
  // tailwind removes all the margins and other default styles from elements like <p>, <h1>, <ul>, etc.
  // so we need to re-enable them by setting corePlugins.preflight to false
  corePlugins: {
    preflight: false,
  }
}
