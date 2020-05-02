const router = require('express').Router();
// const socket_io = require('socket.io');
// var io = socket_io();
// const User = require('../models/User');

// const changeStream = User.watch();

// changeStream.on('change', (change) => {
//   console.log(change); // You could parse out the needed info and send only that data.
//   io.emit('changeData', change);
// });

module.exports = function (io) {
  //Socket.IO
  io.on('connection', function (socket) {
    console.log('User has connected to Index');
    //ON Events
    socket.on('admin', function () {
      console.log('Successful Socket Test');
    });
    //End ON Events
  });
  return router;
};
