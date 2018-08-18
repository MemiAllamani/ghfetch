'use strict';

const DbService = require('./db');


class ProfileService extends DbService {
    constructor() {
        super('profiles');
    }
}

module.exports = new ProfileService;