const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {

}

io.on('connection', socket =>{
    const {user} = socket.handshake.query;
    connectedUsers[user] = socket.id

    console.log(user, socket.id)


});

mongoose.connect('mongodb+srv://gabriel:gabriel11@cluster0-5odfq.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use((req, res, next) =>{
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'})); 
app.use(express.json());
app.use(routes);

//GET, POST, PUT, DELETE

server.listen(3333);