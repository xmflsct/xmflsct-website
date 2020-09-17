import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../components/layout'

const Page = ({ data: { mdx } }) => {
  return (
    <Layout>
      <article>
        <h1 className='text-center font-serif'>{mdx.frontmatter.title}</h1>

        <div className='mt-4 lg:mt-8 lg:px-48'>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Page($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
      body
    }
  }
`

export default Page
