'use strict';

const sessionService = require('./services/session');


const registerAuthStrategy = async (server, options) => {
    
    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', {
        ...options,
        validate: async (decoded, request) => {
            const session = await sessionService.findById(decoded.id)
            return {
                isValid: !!session,
                credentials: session
            };
        }
    });

    server.auth.default('jwt');
};

module.exports = registerAuthStrategy