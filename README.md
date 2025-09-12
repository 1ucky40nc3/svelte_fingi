# svelte_fingi

A SvelteKit UI for the Open Fingi Project

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

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
