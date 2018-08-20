'use strict';

module.exports = {
    server: {
        host: '0.0.0.0',
        port: 3000
    },
    database: {
        client: 'sqlite3',
        connection: {
            filename: "./resources/db.sqlite3"
        },
        pool: {min: 0, max: 2},
        useNullAsDefault: true,
        log: {
            warn(message) {
                console.warn(message);
            },
            error(message) {
                console.error(message);
            },
            deprecate(message) {
                console.log(message);
            },
            debug(message) {
                console.log(message);
            }
        }
    },
    authentication: {
        key: 'NeverShareYourSecret',
        verifyOptions: {
            algorithms: ['HS256']
        }
    }
};
