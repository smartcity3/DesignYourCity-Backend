const express = require('express')
const router = express.Router()
const model = require('../models/idea')

router.get('/', (req, res, next) => {
    model.find({}, (err, ideas) => {
        if (err) {
            return next(new Error(err))
        }

        res.send(ideas)
    })
})

router.post('/', (req, res, next) => {
    var ieda = new model(req.body)

    model.save((err) => {
        if (err) {
            return next(new Error(err))
        }

        res.send(idea)
    })
})

router.get('/:id', (req, res, next) => {
    model.findById(req.params['id'], (err, idea) => {
        if (err) {
            return next(new Error(err))
        }

        res.send(idea)
    })
})

module.exports = router