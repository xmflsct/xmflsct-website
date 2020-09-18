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
          ? 'highlighted designs. Passionate and experienced product designer, based in Stockholm working for H&M Group.'
          : `${pageContext.category.toLowerCase()} designs. Passionate and experienced product designer, based in Stockholm working for H&M Group.`
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
      <h1 className='text-center text-xl lg:text-4xl my-8 lg:mt-0 lg:mb-20 lg:px-64'>
        Passionate and experienced product designer, based in{' '}
        <a
          href='https://visitsweden.com/stockholm/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Stockholm
        </a>{' '}
        working for{' '}
        <a
          href='https://hmgroup.com/'
          target='_blank'
          rel='noopener noreferrer'
        >
          H&amp;M Group
        </a>
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
