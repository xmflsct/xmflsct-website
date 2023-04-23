const { groupBy } = require('lodash')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ './about-zhiyuan/CV-Zhiyuan_Zheng.pdf': 'files' })

  eleventyConfig.addPlugin(require('./eleventy.config.avatar.js'))
  eleventyConfig.addPlugin(require('./eleventy.config.images.js'))
  eleventyConfig.addPlugin(require('./eleventy.config.videos.js'))

  eleventyConfig.addFilter('group_by_year', (array) => {
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

  return {
    templateFormats: ['md', 'liquid'],
    dir: {
      input: 'content',
      includes: '../_includes',
      layouts: '../_layouts'
    }
  }
}
