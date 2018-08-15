'use strict';

const authHandler = require('./controllers/auth');
const userHandler = require('./controllers/user');

const registerRoutes = (server) => {

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello world';
        }
    })

    server.route({
        method: 'POST',
        path: '/auth/login',
        config: authHandler.login
    });

    server.route({
        method: 'POST',
        path: '/auth/logout',
        config: authHandler.logout
    });

    server.route({
        method: 'GET',
        path: '/me',
        config: userHandler.info
    });

    server.route({
        method: 'GET',
        path: '/me/repos',
        config: userHandler.repos
    });
};

module.exports = registerRoutes