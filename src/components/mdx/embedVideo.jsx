import React from 'react'

const EmbedVideo = ({ autoplay, credit, host, source, title, width }) => {
  var url = null
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
  return (
    <div className={`mb-4 lg:mb-8 ${width && `lg:w-wide lg:ml-wideMargin`}`}>
      <div className='relative w-full h-0 pb-16/9 overflow-hidden'>
        <iframe
          src={url}
          title={title}
          name={title}
          allow='autoplay; encrypted-media'
          frameBorder='0'
          className='absolute top-0 left-0 w-full h-full border-0'
        />
      </div>
      {credit && (
        <figcaption className='opacity-50 text-right mt-1'>{credit}</figcaption>
      )}
    </div>
  )
}

export default EmbedVideo
