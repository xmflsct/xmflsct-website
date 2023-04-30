const Image = require('@11ty/eleventy-img')
const path = require('path')

async function imageShortcode(src) {
  const metadata = await Image(`${path.dirname(this.page.inputPath)}/${src}`, {
    widths: [320],
    formats: ['webp', 'jpeg'],
    outputDir: path.dirname(this.page.outputPath),
    urlPath: this.page.url
  })

  return `<div class="w-40 bg-stone-200 rounded-full overflow-hidden my-4 lg:my-8"><a href="javascript:history.back()">
    ${Image.generateHTML(metadata, {
      alt: "Zhiyuan's avatar",
      loading: 'lazy',
      decoding: 'async'
    })}
  </a></div>
  `
}

module.exports = eleventyConfig => {
  eleventyConfig.addAsyncShortcode('avatar', imageShortcode)
}
