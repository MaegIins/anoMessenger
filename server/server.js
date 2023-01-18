import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#000000", "#FFFFFF"];
let users = [];
let messages = [];
/**
 * receive Handcheck when instance is created
 * return all users and messages to the new instance (emit : handcheck)
 * Send new user to all instances except the new instance (emit : addUser)
 */
io.on("connection", (socket) => {
    socket.on("handcheck", () => {
        let user = {
            id: socket.id,
            color : getColor()
        }
        let handcheck = {
            users: users,
            messages: messages
        }
        emitSocket("handcheck", socket.id, handcheck);
        users.forEach((socketuser) => {
          emitSocket("addUser", socketuser.id, user);
        });
        users.push(user);
    });
    socket.on('newMessage', (message) => {
        if(message.content !== ""){
            messages.push(message);
            users.forEach((user) => {
                emitSocket("newMessage", user.id, message);
            });
        }
    });

});

function emitSocket(event,to, data) {
    io.to(to).emit(event, data);
}

function getColor(){
    let usedColors = users.map((user) => user.color);
    let availableColors = colors.filter((color) => !usedColors.includes(color));
    if(availableColors.length > 0){
        return availableColors[0];
    }
    return "#076215";

}
console.log("Listening on port 3000");

httpServer.listen(3000);