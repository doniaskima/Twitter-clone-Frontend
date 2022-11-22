require("dotenv").config();
const port = process.env.PORT || 3000;
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const compression = require("compression");
//import Routes 
const userRouter = require("./routers/user.router");
const postRouter = require("./routers/post.router");

const messageRouter = require("./routers/message.router");
const {
    createMessage,
    startMessage,
} = require("./controllers/message.controller");


const app = express();

const server = http.createServer(app);
const io = socketio(server, { cors: true });
//DB connection
mongoose.connect(process.env.MONGO_DB_URI);
mongoose.connection.on("connected", () => {
    console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
    console.log("mongodb failed with", err);
});
app.get("/", (req, res) => {
    return res.send({ message: "Welcome :))" });
});

let connectedUsers = new Map();

io.on("connection", (socket) => {
    let { id } = socket.client;
    // connection
    socket.on("connectUser", ({ name }) => {
        //  When the client sends 'name', we store the 'name',
        //  'socket.client.id', and 'socket.id in a Map structure
        console.log(name, socket.client.id, socket.id);
        connectedUsers.set(name, [socket.client.id, socket.id]);
        io.emit("onlineUsers", Array.from(connectedUsers.keys()));
    });
    // disconnect
    socket.on("disconnect", () => {
        for (let key of connectedUsers.keys()) {
            if (connectedUsers.get(key)[0] === id) {
                connectedUsers.delete(key);
                break;
            }
        }
        io.emit("onlineUsers", Array.from(connectedUsers.keys()));
    });

    socket.on("startMessage", ({ senderId, receiverEmail }) => {
        console.log(senderId, receiverEmail);
        startMessage(senderId, receiverEmail);
    });

    socket.on("sendMessage", ({ sender, receiver, message }) => {
        const { email, name } = receiver;
        let receiverSocketId = connectedUsers.get(name) === undefined ? false : connectedUsers.get(name)[1];
        let senderSocketId = connectedUsers.get(sender.name)[1];
        createMessage(sender._id, email, message).then(({ info, isNewRecipient }) => {
            if (isNewRecipient && receiverSocketId) {
                io.to(receiverSocketId).emit("newRecipient", info.sender);
            } else if (receiverSocketId) {
                io.to(receiverSocketId).emit("message", info)
            }
            io.to(senderSocketId).emit("message", info);
        });
    });


});

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/messages", messageRouter);


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());


//server listening
app.listen(port, () => {
    console.log(`backend server running on port ${port}`);
});