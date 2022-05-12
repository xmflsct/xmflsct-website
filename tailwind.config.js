module.exports = {
  content: ['./src/**/*.jsx'],
  theme: {
    fontFamily: {
      sans: ['Source Sans Pro', 'sans-serif'],
      serif: ['Source Serif Pro', 'serif']
    },
    extend: {
      colors: {
        'content-light': '#292929',
        'background-light': '#f8f8f8',
        'content-dark': '#ececec',
        'background-dark': '#181818',
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
