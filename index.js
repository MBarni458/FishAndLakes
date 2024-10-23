const express = require('express');
const app = express();

require('./routes/lake')(app);
require('./routes/fish')(app);

app.use(express.static('static'));

const server = app.listen(3000, function () {
    console.log("Listening on port 3000");
});