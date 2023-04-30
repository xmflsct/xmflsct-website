const { groupBy } = require('lodash')
const markdownIt = require('markdown-it')
const markdownItLinkAttributes = require('markdown-it-link-attributes')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./content/favicon.ico')
  eleventyConfig.addPassthroughCopy('./content/about-zhiyuan/CV-Zhiyuan_Zheng.pdf')

  eleventyConfig.addPlugin(require('./eleventy.config.avatar.js'))
  eleventyConfig.addPlugin(require('./eleventy.config.images.js'))
  eleventyConfig.addPlugin(require('./eleventy.config.videos.js'))

  eleventyConfig.addFilter('group_by_year', array => {
    if (!Array.isArray(array) || array.length === 0) {
      return []
    }
    const groups = groupBy(
      array.filter(d => d.data.year),
      'data.year'
    )
    return Object.keys(groups)
      .map(group => ({
        year: group,
        data: groups[group].sort((a, b) => a.data.priority - b.data.priority)
      }))
      .reverse()
  })

  eleventyConfig.setLibrary(
    'md',
    markdownIt({ html: true }).use(markdownItLinkAttributes, {
      attrs: {
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    })
  )

  return {
    templateFormats: ['md', 'liquid'],
    dir: {
      input: 'content',
      includes: '../_includes',
      layouts: '../_layouts'
    }
  }
}
