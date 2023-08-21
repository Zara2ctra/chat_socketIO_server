require("dotenv").config()
const express = require('express');
const sequelize = require("./db.js");
const http = require('http');
const cors = require('cors');
const registerMessageHandlers = require('./handlers/messageHandlers')

const app = express();
app.use(cors());
const server = http.createServer(app);
const PORT = process.env.PORT

const socketIO = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});
const onConnection = (socket) => {
    console.log('User connected')

    const {sharedRoom} = socket.handshake.query;
    socket.sharedRoom = sharedRoom;
    socket.join(sharedRoom)

    registerMessageHandlers(socketIO, socket)

    socket.on('disconnect', () => {
        console.log('User disconnected')
        socket.leave(sharedRoom)
    })
}

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        socketIO.on('connection', onConnection);
        server.listen(PORT, () => {
            console.log(`Server ready. Port: ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
