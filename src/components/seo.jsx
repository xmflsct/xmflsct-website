import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO ({ description, schema, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  return (
    <Helmet
      title={
        title
          ? `${title} | ${site.siteMetadata.title}`
          : site.siteMetadata.title
      }
    >
      <html lang='en' />
      <meta
        name='keywords'
        content='Zhiyuan, Cross-cultural design, Experience design, Design thinking, Product Development'
      />
      <meta
        name='description'
        content={description || site.siteMetadata.description}
      />
      <meta
        name='og:title'
        content={
          title
            ? `${title} | ${site.siteMetadata.title}`
            : site.siteMetadata.title
        }
      />
      <meta
        name='og:description'
        content={description || site.siteMetadata.description}
      />
      <meta name='og:type' content='website' />
      {schema && (
        <script type='application/ld+json'>{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  )
}

export default SEO
