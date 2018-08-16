'use strict';

const config = require('../configs');
const knex = require('knex')(config.database);

class DbService {

    constructor(tableName, identiferName = 'id') {
        this.tableName = tableName;
        this.identiferName = identiferName;
    }

    async create(model) {
        await knex(this.tableName)
            .insert(model);
    }

    async update(model) {
        await knex(this.tableName)
            .where(this.identiferName, model[this.identiferName])
            .update(model);
    }

    async delete() {
        await knex(this.tableName)
            .where(this.identiferName, model[this.identiferName])
            .del();
    }

    async findById(identier, columns = []) {
        let result = await knex(this.tableName)
            .select(...columns)
            .where(this.identiferName, identier)
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