const express = require("express");
const app = express();
const cors = require("cors");
const student = require("./controller/student");
// const skill = require('./controller/skill')
// const school = require('./controller/school')
// const certificate = require('./controller/certificate')

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

const PORT = 8080;

app.listen(process.env.PORT || PORT, function () {
  console.log(`App listening on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Live");
});

app.use((err, req, res, next) => {
  res.status(err.status).json(err);
});

app.use("/student", student);
// app.use('/skill', skill)
// app.use('/school', school)
// app.use('/certificate', certificate)

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});
