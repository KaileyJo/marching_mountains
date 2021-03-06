var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var pg = require('pg');
var bodyParser = require('body-parser');
var connection = require('../../modules/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.get('/*', function(req, res) {

    var id = req.params[0];
    var results = [];

    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT * FROM users ' +
            'LEFT OUTER JOIN states ON users.state_id = states.state_id ' +
            'WHERE user_id = $1;',
            [id]);

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
            console.log('results from account route: ', results);
        });

        //close connection
        query.on('end', function() {
            done();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }

    });
});

router.put('/password/*', function(req, res) {

    // hard coding in id for now, until connected with login/register page
    //var id = req.params[0];
    var id = 1;
    var results = [];

    pg.connect(connection, function (err, client, done) {
        client.query('UPDATE users ' +
            'SET password = $1 ' +
            'WHERE user_id = $2;',
            [req.body.password, id],

            function (err, result) {
                done();

                if (err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(results);
                }

            });
    });
});

router.put('/*', function(req, res) {

    // hard coding in id for now, until connected with login/register page
    //var id = req.params[0];
    var id = 1;
    var results = [];
    console.log('stateid:', req.body.state);

    pg.connect(connection, function (err, client, done) {
        client.query('UPDATE users ' +
            'SET email = $1, ' +
            'password = $2, ' +
            'first_name = $3, ' +
            'last_name = $4, ' +
            'address_line1 = $5, ' +
            'address_line2 = $6, ' +
            'city = $7, ' +
            'state_id = $8, ' +
            'zip = $9, ' +
            'phone = $10 ' +
            'WHERE user_id = $11;',
            [req.body.email, req.body.password, req.body.first_name, req.body.last_name,
                req.body.address_line1, req.body.address_line2, req.body.city, req.body.state,
                req.body.zip, req.body.phone, id],

            function (err, result) {
                done();

                if (err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(results);
                }

            });
    });
});

module.exports = router;