
exports.up = function(knex, Promise) {
    return knex.schema.createTable('repos', function (table) {
        table.increments('id')
            .unsigned()
            .primary();
        table.string('name');
        table.text('description')
        table.boolean('private');
        table.integer('forks_count');
        table.integer('stargazers_count');
        table.integer('session_id')
            .notNullable()
            .references('id')
            .inTable('sessions')
            .onDelete('CASCADE')
            .index();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('repos');
};
