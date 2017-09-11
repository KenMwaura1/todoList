var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');
  const path = require('path');
var port = 3000;
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

//Body Parser Middle ware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes'); //importing route
var index = require('./api/routes/index');
var tasks = require('./api/routes/tasks');
routes(app); //register the routes
//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./api/views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

//set Static Folder
app.use(express.static(path.join(__dirname,'/public')));

app.use('/', index);
app.use('/api', tasks);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
app.listen(port, function(){
console.log('todo list RESTful API server started on: ' + port);
});

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

// Using `mongoose.connect`...
var promise = mongoose.connect('mongodb://localhost/Tododb', {
  useMongoClient: true,
  /* other options */
});
// Or `createConnection`

promise.then(function(db) {
  /* Use `db`, for instance `db.model()`
});
// Or, if you already have a connection
connection.openUri('mongodb://localhost/myapp', { /* options */ });
