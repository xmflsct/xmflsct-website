import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";

import { FiLinkedin } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";

import useDarkMode from "use-dark-mode";

const Header = ({ category }) => {
  const [toggleNav, setToggleNav] = React.useState(false);
  const darkMode = useDarkMode(false);

  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
      allCategories: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(projects)/" } }
      ) {
        group(field: frontmatter___category) {
          fieldValue
        }
      }
      allPages: allMarkdownRemark(
        sort: { fields: [frontmatter___page_order], order: ASC }
        filter: { fileAbsolutePath: { regex: "/pages/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              name
            }
          }
        }
      }
    }
  `);
  return (
    <header className={`${toggleNav ? `header-open` : ``}`}>
      <div className="header-container">
        <button
          className={`nav-burger hamburger hamburger--collapse ${
            toggleNav ? "is-active" : ""
          }`}
          variant="link"
          onClick={() => setToggleNav(!toggleNav)}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        <nav className="header-left">
          <ul role="menu">
            <li role="menuitem">
              <Link to={`/`} activeClassName="active">
                All Projects
              </Link>
              <ul>
                {data.allCategories.group.map(({ fieldValue }, index) => (
                  <li key={index}>
                    <Link
                      to={"/" + fieldValue.toLowerCase()}
                      activeClassName="active"
                      className={category === fieldValue ? "active" : " "}
                    >
                      {fieldValue}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {data.allPages.edges.map(({ node }, index) => (
              <li role="menuitem" key={index}>
                <Link to={node.fields.slug} activeClassName="active">
                  {node.frontmatter.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-center">
          <Link to={`/`}>{data.site.siteMetadata.title}</Link>
        </div>
        <div className="header-right">
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/xmflsct/"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin />
            </a>
            <a
              href="https://www.instagram.com/xmflsct/"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiInstagram />
            </a>
            <a
              href="https://github.com/xmflsct/"
              title="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub />
            </a>
          </div>
          <div className="dark-mode-toggle">
            <button type="button" onClick={darkMode.disable}>
              ☀
            </button>
            <span className="toggle-control">
              <input
                type="checkbox"
                checked={darkMode.value}
                onChange={darkMode.toggle}
                id="toggle-bar"
              />
              <label htmlFor="toggle-bar" />
            </span>
            <button type="button" onClick={darkMode.enable}>
              ☾
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
