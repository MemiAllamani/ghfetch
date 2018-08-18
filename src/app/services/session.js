'use strict';

const DbService = require('./db');


class SessionService extends DbService {
    constructor() {
        super('sessions');
    }
}

module.exports = new SessionService;