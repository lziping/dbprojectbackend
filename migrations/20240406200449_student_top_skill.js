const tb = 'student_top_skill'
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable(tb, (table) => {
        table.integer('student_id');
        table.foreign('student_id').references('student.id').onDelete('SET NULL');
        table.integer('skill_id');
        table.foreign('skill_id').references('skill.skill_id').onDelete('SET NULL');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable(tb)
};
