const express = require('express');
const app = express();

app.use(express.static('static'));

const server = app.listen(3000, function () {
    console.log("Listening on port 3000");
});