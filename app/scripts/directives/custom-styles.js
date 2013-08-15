'use strict';

angular.module('scrollstoolboxApp')
	.directive('customStyles', function() {
		return {
			link: function postLink(scope) {

				function appendSheet() {
					var $sheet = $('#custom-styles-stylesheet');
					if ($sheet.length) {
						$sheet.remove();
					}

					var css = '.owned-colors-none { background: '+scope.user.settings.ownedColors.none+'; }';
					css += '.owned-colors-missing { background: '+scope.user.settings.ownedColors.missing+'; }';
					css += '.owned-colors-playset { background: '+scope.user.settings.ownedColors.playset+'; }';
					css += '.owned-colors-extras { background: '+scope.user.settings.ownedColors.extras+'; }';

					css += '.rarity-common { color: '+scope.user.settings.rarityColors.common+'; }';
					css += '.rarity-uncommon { color: '+scope.user.settings.rarityColors.uncommon+'; }';
					css += '.rarity-rare { color: '+scope.user.settings.rarityColors.rare+'; }';

					css += '.faction-order, .faction-order td:not(.owned) input[type="number"] { background: '+scope.user.settings.factionColors.order+'; }';
					css += '.faction-growth, .faction-growth td:not(.owned)  input[type="number"] { background: '+scope.user.settings.factionColors.growth+'; }';
					css += '.faction-energy, .faction-energy td:not(.owned) input[type="number"] { background: '+scope.user.settings.factionColors.energy+'; }';
					css += '.faction-decay, .faction-decay td:not(.owned) input[type="number"] { background: '+scope.user.settings.factionColors.decay+'; }';

					var head = document.getElementsByTagName('head')[0];
					var style = document.createElement('style');

					style.type = 'text/css';
					style.id = 'custom-styles-stylesheet';
					if (style.styleSheet) {
						style.styleSheet.cssText = css;
					} else {
						style.appendChild(document.createTextNode(css));
					}

					head.appendChild(style);
				}

				appendSheet();



				scope.$watch('user.settings.ownedColors.none + user.settings.ownedColors.missing + user.settings.ownedColors.playset + user.settings.ownedColors.extras + user.settings.rarityColors.common + user.settings.rarityColors.uncommon + user.settings.rarityColors.rare + user.settings.factionColors.order + user.settings.factionColors.growth + user.settings.factionColors.energy + user.settings.factionColors.decay', appendSheet);
			}
		};
	});