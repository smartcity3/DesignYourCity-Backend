require('dotenv').config()

const express = require('express')
const app = express()
const router = express.Router()
const port = 3000
const mongoose = require('mongoose');
const MONGO_URI = process.env['MONGO_URI']
const cors = require('cors')

var project_api = require('./routes/projects_api')
var user_api = require('./routes/user_api')
var idea_api = require('./routes/idea_api')
var bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.use('/projects', project_api)
router.use('/user', user_api)
router.use('/idea', idea_api)

app.use(router)

app.listen(port,
    () => {
        console.log(`DECIT API listening on port ${port}!`)
        mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    }
)