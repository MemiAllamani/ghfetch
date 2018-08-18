
exports.up = function(knex, Promise) {
    return knex.schema.createTable('profiles', function (table) {
        table.increments('id')
            .unsigned()
            .primary();
        table.string('name');
        table.string('company');
        table.string('location');
        table.string('avatarUrl');
        table.integer('followers').unsigned();
        table.integer('following').unsigned();
        table.integer('session_id')
            .notNullable()
            .references('id')
            .inTable('sessions')
            .onDelete('CASCADE');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('profiles');
};
