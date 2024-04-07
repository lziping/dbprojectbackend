const express = require('express')
const app = express()
const cors = require('cors')
const users = require('./controller/users')
const skill = require('./controller/skill')
const school = require('./controller/school')
const certificate = require('./controller/certificate')

const port = 3000

app.use(cors({
    origin: '*'
}));

app.listen(port, () => {
    console.log(`app listening on port 3000`)
})

app.get('/', (req, res) => {
    res.send("Live")
})

app.use((err, req, res, next) => {
    res.status(err.status).json(err)
})

app.use('/users', users)
app.use('/skill', skill)
app.use('/school', school)
app.use('/certificate', certificate)

app.use((req, res) => {
    res.status(404).json({ message: "Route Not Found" })
})