import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../components/layout'

const Project = ({ data: { mdx } }) => {
  return (
    <Layout category={mdx.frontmatter.category}>
      <article>
        <h1 className='relative text-center font-serif'>
          {mdx.frontmatter.title}{' '}
          <sup className='relative lg:absolute lg:top-0 lg:ml-2 lg:mt-4 font-serif'>
            ({mdx.frontmatter.date})
          </sup>
        </h1>

        <div className='mt-4 lg:mt-8 lg:px-48'>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query QueryProject($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "YYYY")
        category
      }
      body
    }
  }
`

export default Project
