const tb = 'student_top_skill';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tb).del();
  const data = await createData();
  await knex(tb).insert(data);
};

async function createData() {
  let data = []
  for (let i = 1; i <= 10; i++) {
    const obj = {
      'skill_id': `${i}`,
      'student_id': `${i}`,
    }
    data.push(obj)
  }
  return data
}
