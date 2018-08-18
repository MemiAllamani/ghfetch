
exports.up = function(knex, Promise) {
    return knex.schema.createTable('sessions', function (table) {
        table.increments('id').unsigned().primary();
        table.string('username');
        table.string('password');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('sessions');
};
