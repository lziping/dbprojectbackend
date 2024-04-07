const tb = 'user_skill_record'
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable(tb, (table) => {
        table.integer('user_id');
        table.foreign('user_id').references('users.id').onDelete('SET NULL');
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
