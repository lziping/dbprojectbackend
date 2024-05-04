const tb = 'student_current_school'
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable(tb, (table) => {
        table.integer('student_id');
        table.foreign('student_id').references('student.id').onDelete('SET NULL');
        table.integer('school_id');
        table.foreign('school_id').references('school.school_id').onDelete('SET NULL');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable(tb)
};
