const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "PrincipleOfDB";
const config = require("../knexfile").development;
let knex = require("knex")(config);

const router = express.Router();
const tb = "student";

router.get("/", async (req, res, next) => {
  try {
    const student = await knex.raw(`SELECT * FROM ${tb} 
        JOIN profile_img ON ${tb}.id = profile_img.student_id 
        JOIN contact ON ${tb}.id = contact.student_id 
        left JOIN student_current_school ON ${tb}.id = student_current_school.student_id 
        left JOIN student_top_skill ON ${tb}.id = student_top_skill.student_id 
        left JOIN student_recent_cert ON ${tb}.id = student_recent_cert.student_id 
        left join school on school.school_id = student_current_school.school_id
        left join skill on skill.skill_id = student_top_skill.skill_id
        left join certificate on certificate.certificate_id = student_recent_cert.certificate_id`);

    return res.status(200).json(student.rows);
  } catch (err) {
    next({ status: 500, error: "student not found" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const student = await knex.raw(`SELECT * FROM ${tb} 
        JOIN profile_img ON ${tb}.id = profile_img.student_id 
        JOIN contact ON ${tb}.id = contact.student_id 
        left JOIN student_current_school ON ${tb}.id = student_current_school.student_id 
        left JOIN student_top_skill ON ${tb}.id = student_top_skill.student_id 
        left JOIN student_recent_cert ON ${tb}.id = student_recent_cert.student_id 
        left join school on school.school_id = student_current_school.school_id
        left join skill on skill.skill_id = student_top_skill.skill_id
        left join certificate on certificate.certificate_id = student_recent_cert.certificate_id
        where student.id = ${req.params.id}`);

    return res.status(200).json(student.rows[0]);
  } catch (err) {
    next({ status: 500, error: "student not found" });
  }
});

router.post("/", async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;

  try {
    if (name && email && phone) {
      const student = await knex(tb)
        .insert({ name, introduce: "This student is too Lazy" })
        .returning("*");

      const asd = await knex("contact")
        .insert({ student_id: student[0].id, email, phone: phone })
        .returning("*");
      const asdd = await knex("profile_img")
        .insert({
          student_id: `${student[0].id}`,
          img_path: `https://images.unsplash.com/photo-1689465572111-9af2f5a02786?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
        })
        .returning("*");

      res.status(201).json(student[0]);
    } else {
      return { error: "Missing Field" };
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name || null;
  const email = req.body.email || null;
  const phone = req.body.phone || null;
  const introduce = req.body.introduce || null;
  const schoolname = req.body.schoolname || null;
  const certificatename = req.body.certificatename || null;
  const skillname = req.body.skillname || null;
  const img_path = req.body.img_path || null;

  try {
    const exists = await knex("student").select("*").where("id", id).first();

    if (!exists) {
      return res.status(404).json({ error: "student Not Found" });
    }

    const student = await knex("student")
      .update({ name, introduce })
      .where("id", id)
      .returning("*");

    await knex("contact")
      .update({ email, phone: phone })
      .where("student_id", id)
      .returning("*");

    await sleep(100);
    await updateSchool(schoolname, id);
    await sleep(100);
    await updateSkill(skillname, id);
    await sleep(100);
    await updateCert(certificatename, id);
    await knex("profile_img")
      .update("img_path", img_path)
      .where("student_id", id);
    res.status(200).json(student[0]);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function updateCert(certificatename, id) {
  let cert = await knex("certificate")
    .select("*")
    .where("certificatename", certificatename)
    .first();
  if (!cert) {
    cert = await knex("certificate")
      .insert({ certificatename: certificatename })
      .returning("*");
    cert = cert[0];
  }
  let certRecord = await knex("student_recent_cert")
    .select("*")
    .where("student_id", id)
    .first();

  if (certRecord) {
    const update = await knex("student_recent_cert")
      .update("certificate_id", cert.certificate_id)
      .where("student_id", id);
  } else {
    const i = await knex("student_recent_cert").insert({
      certificate_id: cert.certificate_id_id,
      student_id: id,
    });
  }
}

async function updateSkill(skillname, id) {
  let skill = await knex("skill")
    .select("*")
    .where("skillname", skillname)
    .first();
  if (!skill) {
    skill = await knex("skill").insert({ skillname: skillname }).returning("*");
    skill = skill[0];
  }
  let skillRecord = await knex("student_top_skill")
    .select("*")
    .where("student_id", id)
    .first();

  if (skillRecord) {
    await knex("student_top_skill")
      .update("skill_id", skill.skill_id)
      .where("student_id", id);
  } else {
    await knex("student_top_skill").insert({
      skill_id: skill.skill_id,
      student_id: id,
    });
  }
}

async function updateSchool(schoolname, id) {
  let school = await knex("school")
    .select("*")
    .where("schoolname", schoolname)
    .first();

  if (!school) {
    school = await knex("school")
      .insert({ schoolname: schoolname })
      .returning("*");
    school = school[0];
  }
  let schoolRecord = await knex("student_current_school")
    .select("*")
    .where("student_id", id)
    .first();

  if (schoolRecord) {
    await knex("student_current_school")
      .update("school_id", school.school_id)
      .where("student_id", id);
  } else {
    await knex("student_current_school").insert({
      school_id: school.school_id,
      student_id: id,
    });
  }
}

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    await knex("student")
      .del()
      .where("student.id", id)
      .join("contact", "contact.student_id", "student.id")
      .join("profile_img", "profile_img.student_id", "student.id");

    res.status(204).json({ message: "student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
