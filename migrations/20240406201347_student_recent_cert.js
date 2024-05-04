const tb = 'student_recent_cert'
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable(tb, (table) => {
        table.integer('student_id');
        table.foreign('student_id').references('student.id').onDelete('SET NULL');
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
