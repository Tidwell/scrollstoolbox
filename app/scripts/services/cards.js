'use strict';
/*
Cards Service

listens
all-cards

sends
all-cards

*/

angular.module('scrollstoolboxApp')
  .service('cards', function($http, $rootScope, socket, user) {

  var cardTemplate = {
    error: false,
    data: {}
  };

  var cards = angular.copy(cardTemplate);
  var userData = user.get();

  socket.on('all-cards', function(data) {
    cards.data = parseSet(data);
    updateCollection();
  });

  function parseSet(res) {
    var rarityMap = ['Common','Uncommon','Rare'];
    for (var cardName in res) {
      res[cardName].price.median = Math.floor((res[cardName].price.high+res[cardName].price.low)/2);
      res[cardName].resource = res[cardName].card.costenergy ? 'Energy' : (res[cardName].card.costgrowth ? 'Growth' : 'Order');
      res[cardName].card.rarity = rarityMap[res[cardName].card.rarity];
    }
    return res;
  }

  function updateCollection() {
    //parse the collection from the user and set the #owned on cards
    console.log('updating collection', userData.owned);
    for (var cardName in cards.data) {
      cards.data[cardName].owned = 0;
    }
  }

  socket.on('user:registered', updateCollection);
  socket.on('user:updated', updateCollection);
  socket.on('user:login', updateCollection);

  return {
    get: function() {
      socket.emit('all-cards');
      return cards;
    },
    update: function() {
      //send update to the server
      return cards;
    }
  };
});