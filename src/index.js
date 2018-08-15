'use strict';

const Hapi = require('hapi');


// load config & create server
const config = require('./app/configs');
const server = Hapi.server(config.server);


// register routes
require('./app/routes')(server);


const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
});

init();