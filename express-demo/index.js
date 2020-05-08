const Joi = require('@hapi/joi');
const express = require('express');
const app = express();
const logger = require('./logger');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');

const courses = require('./routes/courses');
const home = require('./routes/home');

// Use env variable like export DEBUG=app* or export DEBUG=app:startup,app:db to set debug levels
/*
Set the env variable while starting the application DEGUG=app:* nodemon index.js
*/
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

//Configuration
console.log('Application name: ' + config.get('name'));
console.log('mail server: ' + config.get('mail.someprop'));
console.log('mail password: ' + config.get('mail.password'));

console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // process.env.NODE_ENV => undefined if not set
console.log(`app: ${app.get('env')}`);

app.set('view engine',  'pug');
app.set('views', './views');

app.use(express.json()); // middleware, use this in request processing pipeline
app.use(express.urlencoded({ extended: true })); // parses this req and add the json to req.body
app.use(express.static('public'));
app.use(helmet());

app.use('/', home);
app.use('/api/courses', courses);

if(app.get('env') === 'dev'){
    app.use(morgan('tiny'));
    startupDebugger("morgan enabled. . .")
}

// for DB debugging
dbDebugger('Connected to the database');
    

app.use(logger);

app.use(function(req, res, next) {
    console.log('Authentication . . .');
    next(); // required otherwise the request will be stuck here
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

