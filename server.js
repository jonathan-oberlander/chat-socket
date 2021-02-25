const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.emit("message", "Welcome to the chat.");
  socket.broadcast.emit("message", "A user joined the chat.");
  socket.on("disconect", () => {
    io.emit("message", "A user has left the chat.");
  });

  socket.on("chatMessage", (msg) => {
    io.emit("message", msg);
  });
});

const port = 3000 || ProcessingInstruction.env.PORT;
server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
