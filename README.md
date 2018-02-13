# rank
Example app with React, Redux, and Socket.io.  Heavily borrowed from
the github project [https://github.com/hendrikswan/realtime-rethink-lessons]
Thanks Hendrik!



# Prerequisites
node.js/NPM
yarn is recommended

# Installation
Clone this repository

install dependencies: open a console and run

```
$ npm install --loglevel info
```
Note: loglevel only needed for problems during install

```
$ yarn install
```

# Workflow
npm scripts are used to manage the build and execute activities
 
## NPM Scripts

Build the project and start the web server, by default the application will run on http://localhost:8090

```
$ npm start -s
```

Note: saving a file that has been changed will only run lint on that file. You will need to stop the server and rerun `npm start` for all of the files to be linted.


# Default Application Launch
After you run a npm start you can browse to http://localhost:8090 to load the app

# Contributing
