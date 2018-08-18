'use strict';

const Hapi = require('hapi');


// load config & create server
const config = require('./app/configs');
const server = Hapi.server(config.server);


const init = async () => {
    // register auth strategy
    await require('./app/auth')(server, config.authentication);

    // register static serving plugin
    await server.register(require('inert'));

    // register routes
    require('./app/routes')(server);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
});

init();