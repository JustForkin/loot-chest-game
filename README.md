# Another Phaser Boilerplate

Phaser Jump is a starting template for game development using [Phaser.](http://phaser.io/)

## Technologies
this project relies on the following technologies and packages
- [Node](https://nodejs.org/) on the back end. (so make sure you have it installed!)
- [npm scripts](https://docs.npmjs.com/misc/scripts) for build tooling and project management.
- [yarn](https://yarnpkg.com/) dependancy manager.
- [Webpack](https://webpack.github.io/) module builder, we will use this to compile our project, we'll make use of some plugins.
    - [ESlint](http://eslint.org/) will give us helpful code insight during development (more information below).
    - [Babel](https://babeljs.io/) webpack plugin to transpile our pretty ES6 logic into more stable, older javascript.
    - [Uglifyjs](https://github.com/mishoo/UglifyJS) webpack plugin to minimize our assets when its time to go into production.
    - [SASS](http://sass-lang.com/) loader plugin so we can write and compile efficient CSS on the fly.
- [browser-sync](https://www.browsersync.io/) My #1 choice for rapid prototyping tools, we will use this go create our dev environment.
- [electron](http://electron.atom.io/) When we're done with our app, we can ship it to OSX and Windows desktop with Electron
## Getting Started

Make sure you have [Node and NPM](https://nodejs.org/en/). Then you can clone the git repository into your projects folder, open the repo in your terminal and run `npm install` (or if you have yarn installed globally you can just run `yarn`). This will install all project dependancies and create your node_modules folder.

### Scripts

This project uses NPM scripts for building and managing our project through the different stages of development, each of the available scripts will be listed in the table below, and can be run from the parent project folder using `npm run <name>`.

*currently only `dev` works*

*tip: run the dev script in a new shell*

|Name         |Description                                                     |
|-------------|----------------------------------------------------------------|
|`dev`        |builds the unminified files and starts a local dev server at `localhost:3000` with browser-sync|
|`build`      |Runs webpack once and builds the beautiful minified production code.|


### And you're off!

after running the appropriate command (which in the beginning should always be `npm run dev` by the way) and everything has finished loading, you should be able to go to `localhost:3000` in your browser and see our Phaser hello world example.

From here its all on you! configure your editor with ESlint, and dig in!

## Writing ES6 for Phaser

this section will cover useful tips for those that are new to writing ES6 or Phaser or both!

for example: 

- how to properly use the `import` statement
- how to access Phaser's global objects
- which objects should be global, or local
- understanding webpack's `require` statement (sync & async)

### and more to come!
