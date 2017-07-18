const Config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// mongoose connection
mongoose.connect(Config.database);

mongoose.connection.on('error', (err) => {
	throw new Error(`Error: ${err}`);
});

const app = express();

// cors setup
app.use(cors());

// body partser initialize
app.use(bodyParser.json());

// routing

// make routes accessible
const users = require('./routes/users');

app.use('/users', users);

const port = 3000;

app.listen(port, () => {
	
});
