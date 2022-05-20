const
    express = require('express'),
    path = require('path'),
    logger = require('morgan');

var indexRouter = require('../routes/index');
var apiRouter = require('../routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(80);
