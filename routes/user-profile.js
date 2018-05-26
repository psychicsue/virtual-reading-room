var express = require('express');
var router = express.Router();
const auth = require('../authentication/middleware');
const db = require('../db');

// router.get('/', function(req, res, next) {
//   res.render('user-profile', {  });
// });


router.get('/', auth(), function (req, res, next) {

    console.log("User zalogowany:", req.user[0])

    const queryUser = `SELECT * FROM users WHERE email = "${req.user[0].email}"; `;

    db.query(queryUser, (error, result) => {

        if (result === null || result === undefined) {
            res.send("Nie znaleziono takiego użytkownika")
        }
        else {
            res.render('user-profile', { userData: result[0] })
        }
    });

});


module.exports = router;
