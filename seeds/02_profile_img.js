const tb = 'profile_img';

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
      'user_id': `${i}`,
      'img_path': `https://images.unsplash.com/photo-1689465572111-9af2f5a02786?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    }
    data.push(obj)
  }
  return data
}
