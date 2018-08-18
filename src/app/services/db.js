'use strict';

const config = require('../configs');
const knex = require('knex')(config.database);

class DbService {

    constructor(tableName, identiferName = 'id') {
        this.tableName = tableName;
        this.identiferName = identiferName;
    }

    async create(model) {
        let result = await knex(this.tableName)
            .insert(model);
        return result ? result[0] : null;
    }

    async update(model) {
        await knex(this.tableName)
            .where(this.identiferName, model[this.identiferName])
            .update(model);
    }

    async delete(identifier) {
        await knex(this.tableName)
            .where(this.identiferName, identifier)
            .del();
    }

    async findById(identifier, columns = []) {
        let result = await knex(this.tableName)
            .select(...columns)
            .where(this.identiferName, identifier)
            .limit(1);
        return result[0];
    }

    async findBy(filter, columns = []) {
        return await knex(this.tableName)
            .select(...columns)
            where(filter);
    }

    async findAll(columns = []) {
        return await knex(this.tableName)
            .select(...columns);
    }

}

module.exports = DbService;