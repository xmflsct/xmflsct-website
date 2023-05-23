const Image = require('@11ty/eleventy-img')
const path = require('path')

async function imageShortcode(src, alt, credit, website) {
  const metadata = await Image(`${path.dirname(this.page.inputPath)}/${src}`, {
    widths: [832, 1664, 'auto'],
    formats: ['webp', 'jpeg'],
    outputDir: path.dirname(this.page.outputPath),
    urlPath: this.page.url
  })
  const imageAttributes = {
    alt,
    sizes: [''],
    loading: 'lazy',
    decoding: 'async'
  }

  return `<div class="my-4 lg:my-6 bg-stone-200 ${website ? 'shadow-image' : ''}">
    ${
      website
        ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 25" fill-rule="evenodd" xmlns:v="https://vecta.io/nano"><path fill="#e3e1e2" d="M0 0h1920v25H0z"/><path d="M59 12.499c0 3.589-2.912 6.499-6.501 6.499S46 16.088 46 12.499 48.912 6 52.499 6 59 8.91 59 12.499" fill-opacity=".8" fill="#28ca41"/><path d="M40 12.499c0 3.589-2.912 6.499-6.501 6.499S27 16.088 27 12.499 29.912 6 33.499 6 40 8.91 40 12.499" fill-opacity=".8" fill="#ffbd2f"/><path d="M21 12.499c0 3.589-2.912 6.499-6.501 6.499S8 16.088 8 12.499 10.912 6 14.499 6 21 8.91 21 12.499" fill-opacity=".8" fill="#ff554f"/></svg>`
        : ''
    }
    ${Image.generateHTML(metadata, imageAttributes)}
    ${
      typeof credit === 'string'
        ? `<figcaption class="font-serif italic text-sm opacity-50 text-center mt-1">${credit}</figcaption>`
        : ''
    }
  </div>
  `
}

module.exports = eleventyConfig => {
  eleventyConfig.addAsyncShortcode('image', imageShortcode)
}
