import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";
import Img from "gatsby-image";

const Cards = ({ filter }) => {
  const data = useStaticQuery(graphql`
    {
      allProjects: allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fileAbsolutePath: { regex: "/(projects)/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              category
              thumbnail {
                childImageSharp {
                  fluid(maxWidth: 1280) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  return (
    <div className="cards-feed">
      {data.allProjects.edges
        .filter(function(node) {
          if (filter === "*") {
            return true;
          } else {
            return node.node.frontmatter.category === filter;
          }
        })
        .map(({ node }, index) => {
          if (node.frontmatter.thumbnail) {
            return (
              <article
                className={`project-card with-image ${(index + 1) % 3 === 0 &&
                  `project-card-large`}`}
                key={index}
              >
                <Img
                  css={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  style={{
                    position: `absolute`,
                    width: `100%`,
                    height: `100%`
                  }}
                  fluid={node.frontmatter.thumbnail.childImageSharp.fluid}
                />
                <Link to={node.fields.slug} className="project-card-link">
                  <div className="project-card-content">
                    <h6 className="project-card-category">{node.frontmatter.category}</h6>
                    <h2 className="project-card-title">
                      {node.frontmatter.title || node.fields.slug}<br />
                    </h2>
                  </div>
                </Link>
              </article>
            );
          } else {
            return (
              <article
                className={`project-card no-image ${(index + 1) % 3 === 0 &&
                  `project-card-large`}`}
                key={index}
              >
                <Link to={node.fields.slug} className="project-card-link">
                  <div className="project-card-content">
                  <h6 className="project-card-category">{node.frontmatter.category}</h6>
                    <h2 className="project-card-title">
                      {node.frontmatter.title || node.fields.slug}
                    </h2>
                  </div>
                </Link>
              </article>
            );
          }
        })}
    </div>
  );
};

export default Cards;
