/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./eleventy.config.*', './_includes/**/*.liquid', './_layouts/**/*.liquid', './content/**/*.liquid', './content/**/*.md'],
  theme: {
    fontFamily: {
      sans: ['Source Sans Pro', 'sans-serif'],
      serif: ['Source Serif Pro', 'serif']
    },
    extend: {
      colors: {
        highlight: '#F36C21'
      },
      spacing: {
        '16/9': '56.25%',
        icon: '1em'
      },
      boxShadow: {
        'image': '0 0 8px 0 rgba(0, 0, 0, 0.08)'
      }
    }
  }
}
