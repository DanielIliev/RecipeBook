const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log(`DB Connected ${config.database}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`DB error ${err}`);
});

const app = express();
const port = process.env.PORT || 4201;
const users = require('./routes/users');

app.use(cors());

app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.send("Potato");
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});