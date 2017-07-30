const Config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const winston = require('winston');

if(Config.environment != 'development') {
	winston.remove(winston.transports.Console);
} else {
	winston.level = 'debug';
}

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
app.use(require('./routes/public'));
app.use(require('./routes/private'));

const port = 3000;

app.listen(port, () => {

});
