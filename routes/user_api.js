var express = require('express')
var router = express.Router()

// Retrieve logged user details
router.get('/', function (req, res) {
    // TODO: call mongo query here

    res.send({
        fullname: "Foo of Foo's",
        email: "foo@foo.com",
        phone: "+306977777777",
        avatar: "http://localhost/image.jpg"
    });
})

// Update registered user details
router.post('/', function (req, res) {
    // TODO: call mongo query here

    res.send({
        message: "Account updated"
    });
})

// Delete user's account 
router.delete('/', function (req, res, next) {
    // TODO: call mongo query here

    res.send({
        message: "Account has been delete succefuly!"
    });
})

module.exports = router