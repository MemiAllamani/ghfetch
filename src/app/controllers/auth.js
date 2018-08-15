'use strict';

module.exports = {
    login: {
        handler: (request, h) => {
            return 'user logged in';
        }
    },
    logout: {
        handler: (request, h) => {
            return 'user logged out';
        }    
    }
}