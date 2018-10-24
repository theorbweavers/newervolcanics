/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const _ = require(`lodash`);
const path = require(`path`);
const slash = require(`slash`);
const fs = require('fs');

const contentTypes = require('./src/utils/content-types');

const createPageFromContentType = (contentType, graphql, createPage) => {
  return new Promise((resolve, reject) => {
    graphql(
      `
      {
        ${contentType.graphName}(limit: 1000) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
    ).then(result => {
      if (result.errors) {
        reject(result.errors);
      }
      result.data[contentType.graphName].edges.forEach(edge => {
        let pageTemplate = null;
        if (contentType.name === 'page') {
          let pageTemplatePath = path.resolve(
            `${contentType.templateBase}${edge.node.slug}.js`
          );
          pageTemplate = fs.existsSync(pageTemplatePath)
            ? pageTemplatePath
            : null;
        }
        const template = pageTemplate
          ? pageTemplate
          : path.resolve(contentType.template);
        console.log('content', edge.node);
        createPage({
          path: `${contentType.path}/${edge.node.slug}.html`,
          component: slash(template),
          context: {
            id: edge.node.id,
            slug: edge.node.slug,
          },
        });
      });
      resolve();
    });
  });
};

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programatically
// create pages.
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  let pagePromises = [];
  return new Promise((resolve, reject) => {
    contentTypes.map(contentType => {
      pagePromises.push(
        createPageFromContentType(contentType, graphql, createPage)
      );
    });
    Promise.all(pagePromises).then(() => {
      resolve();
    });
  });
};
