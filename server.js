// our base packages
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

// get all our routes
const authRoutes = require("./app/routes/auth");

// initialize express app
const app = express();

// initialize cors and body parser
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// assign our routes
app.use('/auth', authRoutes);

// intialize server
const port = process.env.SERVER_PORT || 3000;
const host = '0.0.0.0';

app.listen(port, host);
console.info(`Started sever on port ${port}`);