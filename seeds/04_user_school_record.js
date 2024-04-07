const tb = 'user_school_record';

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
  for (let i = 1; i <= 50; i++) {
    const obj = {
      'user_id': `${i}`,
      'school_id': 1,
      'start': '2024-01-10',
      'end': '2024-05-15',
    }
    data.push(obj)
  }
  return data
}
