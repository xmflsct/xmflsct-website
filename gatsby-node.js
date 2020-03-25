const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const templatePage = path.resolve(`./src/templates/page.jsx`);
  const templateProject = path.resolve(`./src/templates/project.jsx`);
  const templateCategory = path.resolve(`./src/templates/category.jsx`);

  return graphql(
    `
      {
        allPages: allMdx(filter: { fileAbsolutePath: { regex: "/pages/" } }) {
          edges {
            node {
              fields {
                slug
              }
              id
            }
          }
        }
        allProjects: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fileAbsolutePath: { regex: "/projects/" } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              id
            }
          }
        }
        allCategories: allMdx(
          filter: { fileAbsolutePath: { regex: "/(projects)/" } }
        ) {
          group(field: frontmatter___category) {
            fieldValue
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const pages = result.data.allPages.edges;
    const projects = result.data.allProjects.edges;
    const categories = result.data.allCategories.group;

    pages.forEach(page => {
      createPage({
        path: page.node.fields.slug,
        component: templatePage,
        context: {
          id: page.node.id
        }
      });
    });

    projects.forEach(project => {
      createPage({
        path: project.node.fields.slug,
        component: templateProject,
        context: {
          id: project.node.id
        }
      });
    });

    createPage({
      path: "/",
      component: templateCategory,
      context: {
        category: "*"
      }
    });

    categories.forEach(category => {
      createPage({
        path: category.fieldValue.replace(/\s+/g, "-").toLowerCase(),
        component: templateCategory,
        context: {
          category: category.fieldValue
        }
      });
    });

    return null;
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    }
  });
};
