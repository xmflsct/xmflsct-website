const path = require(`path`)

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const templatePage = path.resolve(`./src/templates/page.jsx`)
  const templateProject = path.resolve(`./src/templates/project.jsx`)
  const templateCategory = path.resolve(`./src/templates/category.jsx`)

  const query = await graphql(`
    {
      allPages: allMdx(filter: { fileAbsolutePath: { regex: "/pages/" } }) {
        nodes {
          id
          slug
        }
      }
      allProjects: allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fileAbsolutePath: { regex: "/projects/" } }
      ) {
        nodes {
          id
          slug
        }
      }
      allCategories: allMdx(
        filter: { fileAbsolutePath: { regex: "/projects/" } }
      ) {
        group(field: frontmatter___category) {
          fieldValue
        }
      }
    }
  `)
  await Promise.all(
    query.data.allPages.nodes.map(async page => {
      createPage({
        path: page.slug,
        component: templatePage,
        context: {
          id: page.id
        }
      })
    })
  )
  await Promise.all(
    query.data.allProjects.nodes.map(async project => {
      createPage({
        path: project.slug,
        component: templateProject,
        context: {
          id: project.id
        }
      })
    })
  )
  createPage({
    path: '/',
    component: templateCategory,
    context: {
      category: '*'
    }
  })
  await Promise.all(
    query.data.allCategories.group.map(async category => {
      createPage({
        path: category.fieldValue.replace(/\s+/g, '-').toLowerCase(),
        component: templateCategory,
        context: {
          category: category.fieldValue
        }
      })
    })
  )
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }
  })
}
