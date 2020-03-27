$(document).ready(function() {

  console.log("Welcome to Polyplot!")

  const socket = io()

  socket.on("clientConnect", function(data) {
    // console.log("Client Count: " + data)
  })

  socket.on("clientDisconnect", function(data) {
    // console.log("Client Count: " + data)
  })

})
