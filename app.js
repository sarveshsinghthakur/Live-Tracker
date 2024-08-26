const express = require('express')
const app = express()
const port = 3000
const http = require('http')
const path = require('path')
const { dirname } = require('path')
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)


app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index')
})

io.on("connection", function(socket) {
    console.log("Client connected");
 
    socket.on("send-location", function(data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });
 
    socket.on("disconnect", function() {
        io.emit("user-disconnect", socket.id);
    });
});

app.listen(port, () => {
  console.log(`port : ${port}`)
})

