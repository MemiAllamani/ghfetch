'use strict';

const authHandler = require('./controllers/auth');
const userHandler = require('./controllers/user');

const registerRoutes = (server) => {

    server.route({
        method: 'POST',
        path: '/auth/login',
        options: authHandler.login
    });

    server.route({
        method: 'POST',
        path: '/auth/logout',
        options: authHandler.logout
    });

    server.route({
        method: 'GET',
        path: '/me',
        options: userHandler.info
    });

    server.route({
        method: 'GET',
        path: '/me/repos',
        options: userHandler.repos
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        options: {
            auth: false,
        },
        handler: {
            directory: {
                path: __dirname + '/../public',
            }
        }
    });
};

module.exports = registerRoutes