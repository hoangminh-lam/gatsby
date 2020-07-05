const path = require(`path`);

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }
      
      return result;
    })
  )
});

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  
  const getArticles = makeRequest(graphql, `
    {
      articles: allStrapiArticle {
        edges {
          node {
            id
          }
        }
      }
      userinfos: allStrapiUserInfo {
        edges {
          node {
            id
          }
        }
      }
      projects: allStrapiProject {
        edges {
          node {
            id
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each article.
    result.data.articles.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.id}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id,
        },
      })
    })
    result.data.userinfos.edges.forEach(({ node }) => {
      createPage({
        path: `/user-info/${node.id}`,
        component: path.resolve(`src/pages/user-info/_id.js`),
        context: {
          id: node.id,
        },
      })
    })
    result.data.projects.edges.forEach(({ node }) => {
      createPage({
        path: `/project/${node.id}`,
        component: path.resolve(`src/pages/project/_id.js`),
        context: {
          id: node.id,
        },
      })
    })
  });
  
  // Query for articles nodes to use in creating pages.
  return getArticles;
};