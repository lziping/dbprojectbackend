const express = require('express')
const config = require('../knexfile').development
let knex = require('knex')(config);

const router = express.Router();
const tb = 'user_skill_record'

router.get('/:skillname/', async (req, res, next) => {
    try {
        const users = await knex.raw(`SELECT * FROM ${tb} JOIN users ON ${tb}.user_id = users.id JOIN profile_img ON ${tb}.user_id = profile_img.user_id JOIN skill ON ${tb}.skill_id = skill.skill_id where skill.skillname = '${req.params.skillname}'`);
        return res.status(200).json(users.rows)
    }
    catch (err) {
        next({ status: 500, error: "user not found" })
    }
});

module.exports = router