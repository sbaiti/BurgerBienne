/**
 * Main application file
 */

"use strict";

// Set default node environment to development
process.env.VENDOR_NODE_ENV = process.env.VENDOR_NODE_ENV || "development";

const express = require("express");
const config = require('./config/environnement.json');
const mongoose = require('mongoose');
const passport = require("passport");

//Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(`${config.db.dbConfig.host}/${config.db.dbConfig.dbName}`,
    { useNewUrlParser: true }, (err) => {
        if (err) {
            console.log('Some problem with the connection ' + err);
        } else {
            console.log('The data base connection is ready');
        }
    });

const port = process.env.port || config.port;
const app = express();
const bodyParser = require('body-parser');
const path = require("path");

require("./passport/passportJwt")(passport);
passport.initialize();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./middleware/cors")(app);

app.use("/Slider",require('./controlers/slider'));
app.use("/User",require('./controlers/user'));


app.listen(port, () => console.log('server connected success', port));



