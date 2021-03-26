import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import Layout from '../components/layout'

const NotFoundPage = ({ data }) => {
  return (
    <Layout title='404'>
      <article>
        <h1 className='relative text-center font-serif'>
          404: not found what you need
        </h1>
        <div className='mt-4 lg:mt-8 lg:px-48'>
          <StaticImage
            src='../assets/404.jpg'
            className='width-wide'
            alt='Page not found image'
          />
        </div>
      </article>
    </Layout>
  )
}

export default NotFoundPage
