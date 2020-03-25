import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Cards from "../components/cards"

class TemplateCategory extends React.Component {
  render() {
    return (
      <Layout
        location={this.props.location}
        title={this.props.data.site.siteMetadata.title}
      >
        <SEO
          title={this.props.data.site.siteMetadata.title}
          description={this.props.data.site.siteMetadata.description}
        />
        {this.props.data.site.siteMetadata.description && (
          <div className="category-header">
            <h2>
              Passionate and experienced product designer, currently based in{" "}
              <a
                href="https://visitsweden.com/stockholm/"
                title="Stockholm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stockholm
              </a>
            </h2>
          </div>
        )}

        <Cards filter={this.props.pageContext.category}/>
      </Layout>
    )
  }
}

export default TemplateCategory

export const pageQuery = graphql`
  query QueryCategory{
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
