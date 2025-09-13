# svelte_fingi

A static [SvelteKit](https://svelte.dev/docs/kit/introduction) UI for the [Open Fingi Project](https://github.com/1ucky40nc3/open_fingi_project).

## Installation

You need to install the following dependencies to get going:

- [nvm](https://github.com/nvm-sh/nvm)
    - Use the `nvm install` Command to install the correct Node.js and npm versions

After install all of the dependencies you can execute the following commands to finish the setup of the Node.js project:

```sh
# Select the correct Node.js version
nvm use
# Install the Node.js dependencies
npm i
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

## Deployment

After [building](#building) the app you can deploy the static content to any webserver you like.

An example of hosting this application in a Nginx Docker container can be found in the [examples/nginx](examples/nginx/README.md) directory.

## Architecture

### Architecture Decisions

#### Web Save Fonts

We only [use web save fonts](https://www.w3schools.com/csSref/css_websafe_fonts.php). This is supposed to help with the simplicity and longevity of the application.