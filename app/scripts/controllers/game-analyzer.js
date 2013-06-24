'use strict';

angular.module('scrollstoolboxApp')
	.controller('GameAnalyzerCtrl', function($scope, game) {
	$scope.game = game.get();

	$scope.getEffect = function(effect) {
		if (effect.msg) { return effect.msg; }
		for (var prop in effect) {
			return prop;
		}
	};

	var parsers = {
		//{"TurnBegin":{"color":"white","turn":1}}
		TurnBegin: function(effect) {
			return 'Begin '+$scope.game.players[effect.TurnBegin.color]+'\'s Turn.  Turn '+effect.TurnBegin.turn+', Round '+Math.ceil(effect.TurnBegin.turn/2);
		},
		//{"ResourcesUpdate":{"whiteAssets":{"availableResources":{"DECAY":0,"ORDER":0,"ENERGY":0,"GROWTH":0},"outputResources":{"DECAY":0,"ORDER":0,"ENERGY":0,"GROWTH":0},"handSize":4},"blackAssets":{"availableResources":{"DECAY":0,"ORDER":0,"ENERGY":0,"GROWTH":0},"outputResources":{"DECAY":0,"ORDER":0,"ENERGY":0,"GROWTH":0},"handSize":5}}}
		ResourcesUpdate: function(effect) {
			var copy = 'Resources Updated: ';
			copy = $scope.game.players.white+':';
			copy += ' G '+effect.ResourcesUpdate.whiteAssets.availableResources.GROWTH+'/'+effect.ResourcesUpdate.whiteAssets.outputResources.GROWTH;
			copy += ' E '+effect.ResourcesUpdate.whiteAssets.availableResources.ENERGY+'/'+effect.ResourcesUpdate.whiteAssets.outputResources.ENERGY;
			copy += ' O '+effect.ResourcesUpdate.whiteAssets.availableResources.ORDER+'/'+effect.ResourcesUpdate.whiteAssets.outputResources.ORDER;
			copy += ' D '+(effect.ResourcesUpdate.whiteAssets.availableResources.DECAY||0)+'/'+(effect.ResourcesUpdate.whiteAssets.outputResources.DECAY||0);

			copy += ' -- ';
			copy += $scope.game.players.black+':';
			copy += ' G '+effect.ResourcesUpdate.blackAssets.availableResources.GROWTH+'/'+effect.ResourcesUpdate.blackAssets.outputResources.GROWTH;
			copy += ' E '+effect.ResourcesUpdate.blackAssets.availableResources.ENERGY+'/'+effect.ResourcesUpdate.blackAssets.outputResources.ENERGY;
			copy += ' O '+effect.ResourcesUpdate.blackAssets.availableResources.ORDER+'/'+effect.ResourcesUpdate.blackAssets.outputResources.ORDER;
			copy += ' D '+(effect.ResourcesUpdate.blackAssets.availableResources.DECAY||0)+'/'+(effect.ResourcesUpdate.blackAssets.outputResources.DECAY||0);
			return copy;
		},
		//{from: "Afromany", text: "gl hf :)", msg: "GameChatMessage"}
		GameChatMessage: function(effect) {
			return effect.from+': '+effect.text;
		}
	};

	$scope.makeCopy = function(effect) {
		var e = $scope.getEffect(effect);
		if (parsers[e]) {
			return parsers[e](effect);
		} else {
			return effect;
		}
	};
});