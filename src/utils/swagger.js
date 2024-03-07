const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const server_config = require('../../config/server.config.json');


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: server_config.SWAGGER_TITLE,
      description: server_config.SWAGGER_DESCRIPTION,
      version: server_config.SWAGGER_VERSION,
    },
  },
  // looks for configuration in specified directories
  apis: ['routes/*.js'],
}


const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, path, port) {
  // Swagger Page
  app.use(`${path}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Documentation in JSON format
  app.get('${path}/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

module.exports = { swaggerDocs } 
