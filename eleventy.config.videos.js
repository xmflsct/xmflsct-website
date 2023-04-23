function videoShortcode(host, source, credit, autoplay) {
  let url = undefined
  switch (host) {
    case 'youtube':
      url = `https://www.youtube.com/embed/${source}?autoplay=${
        autoplay ? '1' : '0'
      }&loop=0&controls=0&modestbranding=1`
      break
    case 'vimeo':
      url = `https://player.vimeo.com/video/${source}?autoplay=${
        autoplay ? '1' : '0'
      }&loop=0&title=0&byline=0&portrait=0`
      break
    default:
      break
  }

  return `<div class="my-4 lg:my-6 bg-stone-200">
    <div class="relative w-full h-0 pb-16/9 overflow-hidden"><iframe src=${url} allow="autoplay; encrypted-media" frameBorder="0" class="absolute top-0 left-0 w-full h-full border-0"></iframe></div>
    ${
      typeof credit === 'string'
        ? `<figcaption class="font-serif italic text-sm opacity-50 text-center mt-1">${credit}</figcaption>`
        : ''
    }
  </div>
  `
}

module.exports = eleventyConfig => {
  eleventyConfig.addShortcode('video', videoShortcode)
}
