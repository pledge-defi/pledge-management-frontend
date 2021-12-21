const openAPI = require('@umijs/openapi');

openAPI.generateService({
  schemaPath: `${__dirname}/swagger.json`,
  serversPath: './src/services/pledge/',
  mockFolder: './mock',
});
