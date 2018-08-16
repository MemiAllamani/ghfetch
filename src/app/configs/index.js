'use strict';

let config = {};

// load configuration based on running env

switch (process.env.NODE_ENV || 'dev') {
    case 'prod':
        config = require('./env_prod');
        break;

    case 'dev':
        config = require('./env_dev');
}

module.exports = config;