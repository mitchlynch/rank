# rank
Example app with React, Redux, and Socket.io.  Heavily borrowed from
the github project https://github.com/hendrikswan/realtime-rethink-lessons and from https://github.com/itaylor/redux-socket.io
Thanks Hendrik and Ian!

rank is a simple app that allows you to create a problem to solve for your team
and have team members add ideas/thoughts/improvements/whatever as "responses" to
the problem/issue.  These responses get "ranked" by simply up-voting them (by clicking
on the count indicator next to the response).  The highest ranking response will
have a flashing red indicator next to it, the second highest a yellow indicator, and
the third highest a blue indicator.  When you create the rank board you set a timer
limit.  When the timer ends, the ability to add responses and/or up-vote for them ends.

The winning response will have an award icon next to it and move to the top
of the list.

# Prerequisites
node.js/NPM
yarn is recommended

# Installation
Clone this repository

Install dependencies: open a console and run

```
$ yarn install (or just type yarn)
```

# RethinkDB installation
Go to https://www.rethinkdb.com/ and follow the download install intructions.

Follow instructions for starting the db based on your OS. For Mac users,
simply open a terminal and type:

```
$ rethinkdb
```

# Workflow
npm scripts are used to manage the build and execute activities
 
## Start the Client And Server

To start the client web server,  open a terminal within the project and change to the /client directory.
Type:

```
$ yarn start
```

Default client web server will run on http://localhost:8090

To start the server, open a second terminal and within the project change to the /server directory.
Type:

```
$ yarn start
```

The default port is 8000, however you can start the server on any port you wish by adding an argument to console command,
e.g.

```
$ yarn start 8888
```

# Default Application Launch
After you run a npm start you can browse to http://localhost:8090 to load the app.

* Note: If you started the server at a different port than the default, add a query param
to the url, e.g. if your server is at port 8888:

```
http://localhost:8090?sp=8888
```

Running multiple servers on different ports allows you to open multiple tabs in
your browser and test the app with "multiple" users.  You can also test connecting/
disconnecting to the app and re-sync by shutting down one of the server instances,
adding new data to the "working" app, then restarting the down server.  You should
see the data automatically sync in the disconnected app.

# Contributing
