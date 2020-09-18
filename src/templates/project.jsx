import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../components/layout'

const Project = ({ data }) => {
  return (
    <Layout
      category={data.mdx.frontmatter.category}
      title={data.mdx.frontmatter.title}
      description={data.mdx.excerpt}
      schema={[
        {
          '@context': 'http://schema.org',
          '@type': 'Article',
          headline: data.mdx.frontmatter.title,
          ...(data.mdx.frontmatter.thumbnail && {
            image:
              data.site.siteMetadata.siteUrl +
              data.mdx.frontmatter.thumbnail.publicURL
          }),
          description: data.mdx.excerpt
        },
        {
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
              name: `${data.mdx.frontmatter.category} designs`,
              item: `${
                data.site.siteMetadata.siteUrl
              }/${data.mdx.frontmatter.category.toLowerCase()}`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: data.mdx.frontmatter.title
            }
          ]
        }
      ]}
    >
      <article>
        <h1 className='relative text-center font-serif'>
          {data.mdx.frontmatter.title}{' '}
          <sup className='relative lg:absolute lg:top-0 lg:ml-2 lg:mt-4 font-serif'>
            ({data.mdx.frontmatter.date})
          </sup>
        </h1>

        <div className='mt-4 lg:mt-8 lg:px-48'>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query QueryProject($id: String!) {
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

export default Project
