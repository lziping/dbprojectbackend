const express = require('express')
const config = require('../knexfile').development
let knex = require('knex')(config);

const router = express.Router();
const tb = 'user_school_record'

router.get('/:schoolname/', async (req, res, next) => {
    try {
        const users = await knex.raw(`SELECT * FROM ${tb} JOIN users ON ${tb}.user_id = users.id JOIN profile_img ON ${tb}.user_id = profile_img.user_id JOIN school ON ${tb}.school_id = school.school_id where school.schoolname = '${req.params.schoolname}'`);
        return res.status(200).json(users.rows)
    }
    catch (err) {
        next({ status: 500, error: "user not found" })
    }
});

module.exports = router