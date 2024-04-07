const express = require('express')
const config = require('../knexfile').development
let knex = require('knex')(config);

const router = express.Router();
const tb = 'user_certificate_record'

router.get('/:cert/', async (req, res, next) => {
    try {
        const users = await knex.raw(`SELECT * FROM ${tb} JOIN users ON ${tb}.user_id = users.id JOIN profile_img ON ${tb}.user_id = profile_img.user_id JOIN certificate ON ${tb}.certificate_id = certificate.certificate_id where certificate.certificatename = '${req.params.cert}'`);
        return res.status(200).json(users.rows)
    }
    catch (err) {
        next({ status: 500, error: "user not found" })
    }
});

module.exports = router