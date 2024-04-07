const tb = 'user_certificate_record'
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable(tb, (table) => {
        table.integer('user_id');
        table.foreign('user_id').references('users.id').onDelete('SET NULL');
        table.integer('certificate_id');
        table.foreign('certificate_id').references('certificate.certificate_id').onDelete('SET NULL');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable(tb)
};
