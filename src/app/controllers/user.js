'use strict';

module.exports = {
    info: {
        handler: (request, h) => {
            return 'current user information';
        }
    },
    repos: {
        handler: (request, h) => {
            return 'list of user\'s repositories';
        }
    }
}