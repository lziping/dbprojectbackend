const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const SECRET_KEY = "PrincipleOfDB"
const tb = 'authentication';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tb).del();
  const data = await createData();
  await knex(tb).insert(data);
  await knex.raw(`SELECT setval('users_id_seq',(SELECT MAX(id) FROM users));`)
};

async function createData() {
  let data = []
  const salt = bcrypt.genSaltSync(10);
  for (let i = 1; i <= 50; i++) {
    const pwd = bcrypt.hashSync(`password${i}`, salt)
    const obj = {
      'user_id': `${i}`,
      'email': `${i}@nyu.edu`,
      'password': pwd,
    }
    data.push(obj)
  }
  return data
}
