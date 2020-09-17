import React from 'react'

const EmbedImage = ({ children, credit, width }) => (
  <div className={`image-fix mb-4 ${width && `lg:w-${width} lg:ml-${width}Margin`}`}>
    {children}
    {credit && (
      <figcaption className='opacity-50 text-right mt-1'>{credit}</figcaption>
    )}
  </div>
)

export default EmbedImage
