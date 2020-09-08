/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
var fs = require('fs');
var dir = './.cache/caches/@prismicio/gatsby-source-prismic-graphql'
const path = require('path');

exports.onPreBootstrap = () => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const subPageTemplate = path.resolve('src/templates/sub-page.js');

  return graphql(`
  {
    prismic {
      allSubPages {
        edges {
          node {
            parent_link {
              ... on PRISMIC_Page {
                _meta {
                  uid
                }
              }
            }
            _meta {
              uid
            }
          }
        }
      }
    }
  }
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }
    console.log(result)
    result.data.prismic.allSubPages.edges.forEach(edge => {
      createPage({
        path: `/${edge.node.parent_link._meta.uid}/${edge.node._meta.uid}`,
        component: subPageTemplate,
        context: {
          slug: edge.node._meta.uid,
        },
      })
    })

  })
}