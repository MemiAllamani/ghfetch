'use strict';

const DbService = require('./db');


class RepoService extends DbService {
    constructor() {
        super('repos');
    }
}

module.exports = new RepoService;