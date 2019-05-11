var express = require('express')
var router = express.Router();
var model = require('../models/project').Project

// Route to retieve projects ordered by latest
router.get('/', (req, res, next) => {
    var query = model.find({})

    query.exec((err, projects) => {
        if (err) {
            return next(new Error(err))
        }

        res.send(projects);
    });
})

// route to create new project
router.post('/', (req, res, next) => {
    var project = new model(req.body)

    project.save((err) => {
        if (err) {
            return next(new Error(err))
        }

        res.send(project)
    })
})

// route to retrieve a specific project
router.get('/:id', (req, res, next) => {
    model.findById(req.params['id'], (err, project) => {
        res.send(project)
    })
})

// route to upvote for a specific project
router.get('/:id/upvote', (req, res, next) => {
    model.findById(req.params['id'], (err, project) => {
        if (err) {
            return next(new Error(err))
        }

        if (project) {
            project.votes.positive += 1
            project.save((err) => {
                if (err) {
                    return next(new Error(err))
                }

                res.send(project)
            })
        } else {
            res.status(404).send()
        }

    })
})

// route to downvote for a specific project
router.get('/:id/downvote', (req, res, next) => {
    model.findById(req.params['id'], (err, project) => {
        if (err) {
            return next(new Error(err))
        }

        if (project) {

            project.votes.negative += 1
            project.save((err) => {
                if (err) {
                    return next(new Error(err))
                }

                res.send(project)
            })
        } else {
            res.status(404).send()
        }

    })
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