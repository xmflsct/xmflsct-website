import React from 'react'
import useDarkMode from 'use-dark-mode'

import BrowserLight from '../../assets/svg/browser-light.svg'
import BrowserDark from '../../assets/svg/browser-dark.svg'

const EmbedImage = ({ children, classes, credit, width, website }) => {
  const darkMode = useDarkMode(false)

  return (
    <div
      className={`${classes} image-fix mb-4 lg:mb-8 ${width &&
        `lg:w-wide lg:ml-wideMargin`}`}
    >
      {website && (darkMode.value ? <BrowserDark /> : <BrowserLight />)}
      {children}
      {credit && (
        <figcaption className='opacity-50 text-right mt-1'>{credit}</figcaption>
      )}
    </div>
  )
}

export default EmbedImage
