# @tobulevicius/create-reactron-app
> Usage: npx @tobulevicius/create-reactron-app [-t] [-tw] [?]

## What does it do?
create-reactron-app builds a React/Electron project for you utilising create-react-app and create-electron-app. It structures the project into an easy to consume layout and populates your package.json file with a new script that handles the React Development Server and Electron application starting.

## Arguments
|Command|Description|
|:------|:----------|
|-t or --typescript|If provided, will enable TypeScript within the React project.|
|-tw or --tailwind|If provided, will enable TailwindCSS within the React project.|
|? or -h or --help|If provided, will print out a help statement.|

## Project Layout

The following is the structure created by this script:

- package.json
- tailwind.config.js
- postcss.config.js
- *node_modules/*
- *src/*
    - index.js
    - *main/*
        - electron.js
    - *renderer/*
        - *components/*
        - *containers/*
        - *css/*
            - index.css

The entry point for the React application is within /src/index.js

From here it is recommended that the developer created an application container within /src/renderer/containers/ which will be the head component of the application. All other development on the React side can resume within the renderer folder from that point on.

The reason the electron application is within the React project is so that we can use node integration easily. There are other preferred structures out there, but for me personally, this is the easiest to work with. I hope it can provide an easier path for you as well.

## Thank you

For using and supporting this project!