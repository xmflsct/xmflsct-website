import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import { handleLogin, isLoggedIn } from "../components/auth";
import Layout from "../components/layout";
import SEO from "../components/seo";

class TemplateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = { secret: null, allowed: isLoggedIn() };
  }

  render() {
    const post = this.props.data.mdx;
    return (
      <Layout
        location={this.props.location}
        title={this.props.data.site.siteMetadata.title}
        category={post.frontmatter.category}
      >
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article
          className={`post-content ${post.frontmatter.thumbnail || `no-image`}`}
        >
          <header className="post-header">
            <h2 className="post-title">
              <sup>({post.frontmatter.date})</sup>
              {post.frontmatter.title}
            </h2>
          </header>

          {!post.frontmatter.limited || this.state.allowed ? (
            <div className="post-body">
              <MDXRenderer>{post.body}</MDXRenderer>
            </div>
          ) : (
            <div className="post-body secret">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleLogin(this.state);
                  this.setState({ allowed: isLoggedIn() });
                }}
              >
                <input
                  className="textbox"
                  type="password"
                  placeholder="Secret"
                  size={12}
                  onChange={e => this.setState({ secret: e.target.value })}
                />
                <input className="button" type="submit" value="View" />
              </form>
            </div>
          )}
        </article>
      </Layout>
    );
  }
}

export default TemplateProject;

export const pageQuery = graphql`
  query QueryProject($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "YYYY")
        description
        category
        limited
      }
      body
    }
  }
`;
