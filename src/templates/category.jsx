import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Cards from '../components/cards'

const Category = ({ data, pageContext }) => {
  return (
    <Layout
      category={pageContext.category}
      title={pageContext.category !== '*' && `${pageContext.category} designs`}
      description={`Zhiyuan's ${
        pageContext.category === '*'
          ? 'highlighted designs. Passionate and experienced product designer, based in Rotterdam working towards a better internet at Cloudflare.'
          : `${pageContext.category.toLowerCase()} designs. Passionate and experienced product designer, based in Rotterdam working towards a better internet at Cloudflare.`
      }`}
      schema={
        pageContext.category !== '*' && {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: data.site.siteMetadata.title,
              item: data.site.siteMetadata.siteUrl
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: `${pageContext.category} designs`
            }
          ]
        }
      }
    >
      <h1 className='text-center text-xl leading-snug lg:text-4xl lg:leading-snug my-8 lg:mt-0 lg:mb-20 lg:px-32'>
        Experienced designer who enjoys making things work. Based in{' '}
        <a
          href='https://en.rotterdam.info/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Rotterdam
        </a>{' '}
        , working towards a better internet at{' '}
        <a
          href='https://cloudflare.com/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Cloudflare
        </a>
        .
      </h1>

      <Cards filter={pageContext.category} />
    </Layout>
  )
}

export const query = graphql`
  query QueryCategory {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`

export default Category
