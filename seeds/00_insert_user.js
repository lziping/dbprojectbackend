const tb = 'users';

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
      'id': `${i}`,
      'name': `student${i}`,
      'introduce': 'This user is too lazy'
    }
    data.push(obj)
  }
  return data
}
