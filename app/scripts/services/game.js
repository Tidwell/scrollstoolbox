'use strict';

angular.module('scrollstoolboxApp')
  .service('game', function($http, $rootScope, socket) {
  var gameTemplate = {
    error: false,
    game: [],
    players: {
      white: '',
      black: ''
    },
    version: 0,
    gameType: ''
  };

  var game = angular.copy(gameTemplate);

  socket.on('user:error', function(data) {
    game.error = data.error;
  });

  function updateGame(data) {
    game.version = data[0].version;
    game.players = {
      white: data[1].white,
      black: data[1].black
    };
    game.gameType = data[1].gameType;
    data.splice(0,4);
    game.game = data;
  }

  socket.on('game:data', updateGame);

  return {
    get: function(data) {
      game.error = false;
      socket.emit('game:get', data);
      return game;
    }
  };
});