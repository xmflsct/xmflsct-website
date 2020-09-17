module.exports = {
  purge: ['./src/**/*.jsx', './src/**/*.mdx'],
  theme: {
    fontFamily: {
      sans: ['Source Sans Pro', 'sans-serif'],
      serif: ['Source Serif Pro', 'serif']
    },
    extend: {
      colors: {
        light: {
          default: '#292929',
          bg: '#f8f8f8'
        },
        dark: {
          default: '#ececec',
          bg: '#181818'
        },
        highlight: '#ffcd00'
      },
      flex: {
        double: '1 1 50%',
        single: '1 1 100%'
      },
      height: {
        card: '22rem'
      },
      spacing: {
        '16/9': '56.25%',
        wide: '125%',
        wideMargin: '-12.5%'
      }
    }
  },
  variants: {},
  plugins: []
}
