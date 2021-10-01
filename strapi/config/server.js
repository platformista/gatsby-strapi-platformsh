module.exports = ({ env }) => ({

  // Basic server settings.
  //
  // See https://strapi.io/documentation/v3.x/getting-started/deployment.html#application-configuration
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),

  // Admin user JWT configuration.
  //
  // See https://strapi.io/documentation/v3.x/plugins/users-permissions.html#jwt-configuration
  admin: {
    auth: {
      secret: env('PLATFORM_PROJECT_ENTROPY', '6d033a1eadb0a343106e08fb575cf19a'),
    },
  },
  // GraphQL endpoint configuration.
  //
  // See https://strapi.io/documentation/v3.x/plugins/graphql.html#usage
  graphql: {
    endpoint: '/graphql',
    shadowCRUD: true,
    playgroundAlways: true,
    depthLimit: 7,
    amountLimit: 100,
    apolloServer: {
      tracing: false,
    }
  },
});
