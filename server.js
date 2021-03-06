const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const http = require('http');
const server = http.createServer(app);

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

io.on('connection', (socket) => {  
  
  console.log('a user connected');

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
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log('Now listening'));
});