var express = require('express')
var router = express.Router();
var model = require('../models/project')

// Route to retieve projects ordered by latest
router.get('/', (req, res, next) => {
    // TODO: call mongo query here

    res.send({
        projects: model.projects
    })
})

// route to create new project
router.post('/', (req, res, next) => {
    // TODO: call mongo query here

    model.projects.push(req.body)

    res.status(200).send(req.params)
})

// route to retrieve a specific project
router.get('/:id', (req, res, next) => {
    // TODO: call mongo query here
    
    res.json(
        model.projects.find(item => item.id == req.params.id)
    )
})

// route to vote for a specific project
router.post('/:id/vote', (req, res, next) => {
    // TODO: call mongo query here

    model.projects.find(item => {
        if (item.id === req.params.id) {
        }
        item.voting
    })
    res.send()
})

// route to fund a project
router.post('/:id/fund', (req, res, next) => {
    // TODO: call mongo query here

    model.projects.find(item => {
        if (item.id === req.params.id) {
        }
        item.voting
    })
    res.send()
})

// route to retrieve project bakers
router.post('/:id/bakers', (req, res, next) => {
    // TODO: call mongo query here
    
    model.projects.find(item => {
        if (item.id === req.params.id) {
        }
        item.voting
    })
    res.send()
})

module.exports = router