import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


io.on("connection", (socket) => {
    console.log(socket);
});


console.log("Listening on port 3000");

httpServer.listen(3000);