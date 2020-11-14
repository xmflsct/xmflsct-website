import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../components/layout'

const Case = ({ data: { mdx, site } }) => {
  return (
    <Layout
      category={mdx.frontmatter.category}
      title={mdx.frontmatter.title}
      description={mdx.excerpt}
      schema={[
        {
          '@context': 'http://schema.org',
          '@type': 'Article',
          headline: mdx.frontmatter.title,
          ...(mdx.frontmatter.thumbnail && {
            image:
              site.siteMetadata.siteUrl + mdx.frontmatter.thumbnail.publicURL
          }),
          description: mdx.excerpt
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: site.siteMetadata.title,
              item: site.siteMetadata.siteUrl
            },
            mdx.frontmatter.category && {
              '@type': 'ListItem',
              position: 2,
              name: `${mdx.frontmatter.category} designs`,
              item: `${
                site.siteMetadata.siteUrl
              }/${mdx.frontmatter.category.toLowerCase()}`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: mdx.frontmatter.title
            }
          ]
        }
      ]}
    >
      <article className='mt-4 lg:mt-8 lg:px-48'>
        <h1 className='relative text-center font-serif mb-4 lg:mb-8'>
          {mdx.frontmatter.title}{' '}
          <sup className='relative lg:absolute lg:top-0 lg:ml-2 lg:mt-4 font-serif'>
            ({mdx.frontmatter.date})
          </sup>
        </h1>

        <div>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query QueryCase($id: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "YYYY")
        category
        thumbnail {
          publicURL
        }
      }
      body
      excerpt(pruneLength: 150, truncate: true)
    }
  }
`

export default Case
