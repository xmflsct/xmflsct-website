import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "../components/layout";
import SEO from "../components/seo";

class TemplatePage extends React.Component {
  render() {
    const post = this.props.data.mdx;

    return (
      <Layout
        location={this.props.location}
        title={this.props.data.site.siteMetadata.title}
      >
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article className={"post-content"}>
          <header className="post-header">
            <h2 className="post-title">{post.frontmatter.title}</h2>
          </header>

          <div className="post-body">
            <MDXRenderer>{post.body}</MDXRenderer>
          </div>
        </article>
      </Layout>
    );
  }
}

export default TemplatePage;

export const pageQuery = graphql`
  query Page($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      excerpt(pruneLength: 160)
      frontmatter {
        title
        description
      }
      body
    }
  }
`;
