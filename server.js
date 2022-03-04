const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

// Create an HTTP server taking app (defined as express(); above), then set it to variable called "server".
const http = require('http');
const server = http.createServer(app);

// Set Server object to require socket.io, then define io as a new Server object that passes "server" variable as argument.
// This finalizes the connection between express and socket.io. Socket.io can now use express server as it's base of operations.
const { Server } = require("socket.io");
const io = new Server(server);

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

// io calls socket.io.
// io.on calls the following function when a socket.io session is made
// connection is the event and socket is what's created when the event goes through
io.on('connection', (socket) => {  
  
  console.log('a user connected');

  // as such, socket.on is used here instead of io.on

  socket.on('disconnect', () => {    
    console.log('user disconnected');  
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);

  });

  socket.on('chat message', (msg) => {    
    io.emit('chat message', msg);  
  });

});

// "Normal" HTTP requests are handled using Express.js and other middleware
// To finalize initialization of Socket.IO, app.listen was changed to server.listen. 
// This is because further up in the document we made it such that const server = http.createServer(app);
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log('Now listening'));
});

// socket.io can now use the application. see chatbox.handlebars for further socket.io functionality.