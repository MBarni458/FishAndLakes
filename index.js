const express = require('express');
const bodyParser = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('static'));

require('./routes/fish')(app);
require('./routes/lake')(app);

const server = app.listen(3000, function () {
    console.log("Listening on port 3000");
});