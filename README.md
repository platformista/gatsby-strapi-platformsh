# Gatsby Strapi multi-app for Platform.sh

<p align="center">
<a href="https://console.platform.sh/projects/create-project?template=https://raw.githubusercontent.com/platformsh/template-builder/master/templates/gatsby-strapi/.platform.template.yaml&utm_content=gatsby-strapi&utm_source=github&utm_medium=button&utm_campaign=deploy_on_platform">
    <img src="https://platform.sh/images/deploy/lg-blue.svg" alt="Deploy on Platform.sh" width="180px" />
</a>
</p>

This template builds a two application project to deploy the Headless CMS pattern using Gatsby as its frontend and Strapi for its backend. The `gatsby-source-strapi` source plugin is used to pull data from Strapi during the `post_deploy` hook into the Gatsby Data Layer and build the frontend site. Gatsby utilizes the Platform.sh Configuration Reader library for Node.js to define the backend data source in its configuration. It is intended for you to use as a starting point and modify for your own needs.

Note that there are several setup steps required after the first deploy to create your first content types and access permissions in Strapi. See the included README's post-install section for details.

Gatsby is a free and open source framework based on React that helps developers build blazing fast websites and apps, and Strapi is a Headless CMS framework written in Node.js.

## Features

* Node.js 14
* PostgreSQL 13
* Automatic TLS certificates
* Multi-app configuration
* Delayed SSG build (post deploy hook)

## Post-install

This template is based on Strapi's [Starter Gatsby Blog](https://github.com/strapi/strapi-starter-gatsby-blog), and will deploy a [multi-app project](https://docs.platform.sh/configuration/app/multi-app.html) with Strapi and Gatsby. Strapi will deploy including two custom content types (Article and Category).

After the project has deployed, however, you will  need to:

- manually register a new Strapi admin user
- create content (Articles and Categories)
- configure permissions

### Create an admin user

Visit the `backend.<generated url>` subdomain. Strapi will direct you to visit the `/admin` path to register an administrative user. You will need to register an admin user.

### Permissions

Next, you need to adjust `Public` permissions. You can do that by going to `<backend-url>/admin/settings/users-permissions/roles/2`.
Adjust the permissions for the two collections:

- `Category`: select `find` and `findone`
 - `Article`: select `find` and `findone`

Save your changes.

### Create test content

Head over to `Articles` and `Categories` in the sidebar and create (and publish) some test content.

### Test

After you have completed the above steps, you will be able to test their availability at `<backend-url>/articles`, `<backend-url>/articles/1`, `<backend-url>/categories`, and `<backend-url>/categories/1`.

Since Strapi is configured with the GraphQL plugin, the content is also available to be retrieved via a GraphQL query executed against the `<backend-url>/graphql` endpoint, .e.g.

```graphql
{ 
  articles { 
    id, 
    title, 
    category { 
      name 
    } 
  } 
}
```

### Rebuild Gatsby frontend

To rebuild the Gatsby frontend with this new data, run the command `platform redeploy -p <PROJECT ID> -e master` to redeploy the environment, or use the Web Console.

## Local development

The `gatsby-config.js` file has been modified to set the `gatsby-source-strapi` plugin's `apiURL` attribute automatically on a Platform.sh environment.

If you are developing your Gatsby app locally, this value will instead be set to the value of the `API_URL` environment variable. Though we directly support using a `.env` file, it is ultimately up to you how to make the `API_URL` variable available in your local environment.

As an example, this is how you set the local `API_URL` variable to a Platform.sh environment using `.env`. 

```bash
# .env

API_URL="https://www.backend.pr-1-djjnuwy-muwzogvpcpoe2.eu-3.platformsh.site"
```

> **NOTE**
>
> The `apiURL` attribute will fail to retrieve posts if it contains a trailing slash, so be sure to exclude it when setting `API_URL`.

## Customizations

The following files and additions make the framework work.  If using this project as a reference for your own existing project, replicate the changes below to your project.

* The `.platform.app.yaml`, `.platform/services.yaml`, and `.platform/routes.yaml` files have been added. These provide Platform.sh-specific configuration and are present in all projects on Platform.sh.  You may customize them as you see fit.
* An additional Platform.sh configuration reader module for [Node.js](https://github.com/platformsh/config-reader-nodejs) has been added. It provides convenience wrappers for accessing the Platform.sh environment variables.
* `frontend/gatsby-config.js` has been modified to read the Strapi backend url and assign it to the `apiURL` attribute for the `gatsby-source-strapi` plugin. Since routes are not available during the build hook, and since we want this value to be generated and unique on each environment, `gatsby build` runs and pulls in content from the Wordpress app during the `post_deploy` hook on the mounted `public` directory.

## References

* [Gatsby](https://www.gatsbyjs.org/)
* [gatsby-source-strapi on GitHub](https://github.com/strapi/gatsby-source-strapi)
* [Building a Static Blog using Gatsby and Strapi](https://strapi.io/blog/build-a-static-blog-with-gatsby-and-strapi)
* [Gatsby CMS with Strapi](https://strapi.io/gatsby-cms)
* [Strapi](https://strapi.io/)
* [Node.js on Platform.sh](https://docs.platform.sh/languages/nodejs.html)
