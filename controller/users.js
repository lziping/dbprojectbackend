const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const SECRET_KEY = "PrincipleOfDB"
const config = require('../knexfile').development
let knex = require('knex')(config);

const router = express.Router();
const tb = 'users'

router.get('/', async (req, res, next) => {
    try {
        const users = await knex.raw(`SELECT * FROM ${tb} JOIN profile_img ON ${tb}.id = profile_img.user_id`);
        return res.status(200).json(users.rows)
    }
    catch (err) {
        next({ status: 500, error: "user not found" })
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const users = await knex.raw(`SELECT * FROM ${tb} JOIN profile_img ON ${tb}.id = profile_img.user_id where users.id = ${req.params.id} `);
        return res.status(200).json(users.rows[0])
    }
    catch (err) {
        next({ status: 500, error: "user not found" })
    }
});

router.get('/name/:name', async (req, res, next) => {
    try {
        const users = await knex.raw(`SELECT * FROM ${tb} JOIN profile_img ON ${tb}.id = profile_img.user_id where users.name LIKE '%${req.params.name}%'`);
        return res.status(200).json(users.rows)
    }
    catch (err) {
        next({ status: 500, error: "user not found" })

    }
});

router.get('/detail/:id', async (req, res, next) => {
    try {
        const users = await knex.raw(`SELECT * FROM ${tb} JOIN profile_img ON ${tb}.id = profile_img.user_id JOIN user_school_record ON user_school_record.user_id = users.id JOIN school ON school.school_id = user_school_record.school_id JOIN user_skill_record ON user_skill_record.user_id = users.id JOIN skill ON skill.skill_id = user_skill_record.skill_id JOIN user_certificate_record ON user_certificate_record.user_id = users.id JOIN certificate ON certificate.certificate_id = user_certificate_record.certificate_id where users.id = ${req.params.id} `);
        return res.status(200).json(users.rows)
    }


    catch (err) {
        next({ status: 500, error: "user not found" })
    }
});

router.post('/', async (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    try {
        if (name && email && password) {
            const emailResult = (await knex.raw(`SELECT count(email) from authentication where email LIKE '${email}'`)).rows[0].count;
            if (emailResult === '0') {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(password, salt)
                const user = await knex.raw(`INSERT INTO users (name, introduce)
                VALUES ('${name}', '${introduce}') RETURNING *;`)
                console.log(user.rows[0])
                const asd = await knex.raw(`INSERT INTO authentication (user_id, email,password)
                VALUES ('${user.rows[0].id}', '${email}','${hashedPassword}') RETURNING *;`)
                console.log(asd.rows)
                return user.rows[0]
            }
            else {
                return { error: 'Email Exist' }
            }
        }
        else {
            return { error: 'Missing Field' }
        }

    }
    catch (err) {
        return []
    }
});

module.exports = router