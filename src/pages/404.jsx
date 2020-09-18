import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'

const NotFoundPage = ({ data }) => {
  return (
    <Layout title='404'>
      <article>
        <h1 className='relative text-center font-serif'>
          404: not found what you need
        </h1>
        <div className='mt-4 lg:mt-8 lg:px-48'>
          <Img
            fluid={data.image.childImageSharp.fluid}
            className='width-wide'
          />
        </div>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    image: file(relativePath: { eq: "404.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 864) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default NotFoundPage
