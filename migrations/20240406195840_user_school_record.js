const tb = 'user_school_record'
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable(tb, (table) => {
        table.integer('user_id');
        table.foreign('user_id').references('users.id').onDelete('SET NULL');
        table.integer('school_id');
        table.foreign('school_id').references('school.school_id').onDelete('SET NULL');
        table.date('start');
        table.date('end');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable(tb)
};