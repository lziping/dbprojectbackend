const tb = 'school';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tb).del();
  await knex(tb).insert({
    'school_id': 1,
    'schoolname': 'New York University',
  });
};
