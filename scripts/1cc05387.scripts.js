"use strict";angular.module("scrollstoolboxApp",["ui.bootstrap","ngCookies"]).config(["$routeProvider","$locationProvider",function(a,b){b.html5Mode(!0),a.when("/home",{templateUrl:"/views/main.html",controller:"MainCtrl"}).when("/account",{templateUrl:"/views/account.html",controller:"AccountCtrl"}).when("/forgot-password",{templateUrl:"/views/forgot-password.html",controller:"ForgotPasswordCtrl"}).when("/links",{templateUrl:"/views/links.html",controller:"LinksCtrl"}).when("/faq",{templateUrl:"/views/faq.html",controller:"FaqCtrl"}).when("/collection",{templateUrl:"/views/collection.html",controller:"CollectionCtrl"}).when("/wtswtb",{templateUrl:"/views/wtswtb.html",controller:"WtswtbCtrl"}).when("/contact",{templateUrl:"/views/contact.html",controller:"ContactCtrl"}).when("/game-analyzer",{templateUrl:"/views/game-analyzer.html",controller:"GameAnalyzerCtrl"}).when("/changelog",{templateUrl:"/views/changelog.html",controller:"ChangelogCtrl"}).when("/collection/:username",{templateUrl:"/views/collection-list.html",controller:"CollectionListCtrl"}).otherwise({redirectTo:"/home"})}]),angular.module("scrollstoolboxApp").controller("MainCtrl",["$scope","user","$dialog",function(a,b,c){function d(){$(".modal-backdrop").show()}function e(){$(".modal-backdrop").hide()}a.user=b.get();var f;a.startDialog=function(g){return d(),a.user.authed?a.user.inGameName?(g?"final"===g&&(f=c.dialog({backdrop:!0,keyboard:!0,backdropClick:!0,templateUrl:"views/enable-sync-dialog.html",controller:"EnableSyncCtrl"}),f.open().then(function(){e()})):(f=c.dialog({backdrop:!0,keyboard:!0,backdropClick:!0,templateUrl:"views/download-summoner-dialog.html",controller:"DownloadDialogCtrl"}),f.open().then(function(b){b||e(),b&&a.startDialog("final")})),void 0):(f=c.dialog({backdrop:!0,keyboard:!0,backdropClick:!0,templateUrl:"views/set-in-game-name-dialog.html",controller:"SetInGameNameDialogCtrl"}),f.open().then(function(c){return c||e(),c&&a.user.authed?(a.user.inGameName=c,b.update(),a.startDialog(),void 0):void 0}),void 0):(f=c.dialog({backdrop:!0,keyboard:!0,backdropClick:!0,templateUrl:"views/register-dialog.html",controller:"RegisterDialogCtrl"}),f.open().then(function(b){return b||e(),b&&a.user.authed?(a.startDialog(),void 0):void 0}),void 0)}}]),angular.module("scrollstoolboxApp").controller("LinksCtrl",["$scope",function(a){a.links={prices:[{title:"Scrolls Post",url:"http://www.scrollspost.com/",description:"Price checking, Filters, Time-Ranged pricing, generated from in-game bot"},{title:"Scrolls Prices",url:"http://scrollsprices.com/",description:"Price checking"}],trading:[{title:"Scrolls Swap",url:"http://scrollswap.com/",description:"Post buy/sell/trade requests"},{title:"Trading Scrolls",url:"http://www.tradingscrolls.com/",description:"Post buy/sell/trade requests"},{title:"Scrolls Trader",url:"http://www.scrollstrader.com/",description:"Post buy/sell/trade requests"},{title:"Scrolls Shop",url:"http://www.scrollsshop.com/",description:"Mod-supported collection tracking, WTS list generation"}],deckbuilders:[{title:"Scrolls Guide Deckbuilder",url:"http://www.scrollsguide.com/deckbuilder/",description:"Sorting, Drag and Drop, Card Browser, Filters, Saving (account required)"},{title:"Famous Frames Deckbuilder",url:"http://scrolls.famousframes.de/",description:"Sorting, Search, Card Browser, Full-Card Visual Deckview, Sharing & Saving, Decks Browser, Commenting"}],official:[],fansites:[],lists:[{title:"Scrolls Guide Wiki Database",url:"http://www.scrollsguide.com/wiki/index.php/Scrolls_Database",description:"Browse all cards, Sorting, includes removed and upcomming cards."},{title:"Scrolls.Me Library",url:"http://library.scrolls.me/",description:"Browse all cards, Filters"},{title:"Visual Card Spoiler",url:"http://www.morosanmihail.com/home/scrolls-cards",description:"Browse images of all cards, Filters"}],misc:[{title:"Scrolls Guide Card Maker",url:"http://www.scrollsguide.com/designer",description:"Create custom cards"}],developers:[{title:"ScrollsGuide API",url:"http://www.reddit.com/r/Scrolls/comments/1ge2wj/full_scrolls_sqldb_or_spreatsheet/caje1f3",description:"Reddit thread for how to request ScrollsGuide API acess"},{title:"Summoner",url:"http://www.scrollsguide.com/forum/viewforum.php?f=59",description:"aka ModLoader, allows you to write mods for scrolls in C#"}],notUpdated:[{category:"prices",title:"Scrolls Trading Bulletin",url:"http://trading.scrolls.pw/",description:"Price checking and card information, generated from in-game bot"},{category:"prices",title:"Scrolls PC",url:"http://scrollspc.com/",description:"Price checking, price voting, historical price charts (no longer updated)"},{category:"trading",title:"Fast Trade",url:"http://scrollspc.com/fasttrade/index.php",description:"Made by ScrollsPC, post buy/sell requests"},{category:"developers",title:"ScrollsPC API",url:"http://scrollspc.icyboards.net/showthread.php?tid=14",description:"Forum thread on ScrollsPC detailing their API. (no longer available)"},{category:"developers",title:"Scrolls Trading Bulletin API",url:"http://www.reddit.com/r/Scrolls/comments/1gqzg9/scrolls_trading_sites_comparisonaverage_in_json/can6dge",description:"Reddit thread detailing Scrolls Trading Bulletin API"}]}}]),angular.module("scrollstoolboxApp").controller("NavCtrl",["$scope","$location","user","socket","$cookies",function(a,b,c,d,e){function f(){a.username="",a.password=""}a.user=c.get(),a.username=e.username||"",a.password=e.password||"",a.rememberMe=e.rememberMe||!1,a.$watch("user.authed",function(){a.user.authed&&f()}),d.on("user:updated",function(){a.userUpdated=!0}),a.saveMsgs=[],a.updateMsgs=[],d.on("card:saved",function(b){-1===a.saveMsgs.indexOf(b)&&a.saveMsgs.push(b)}),d.on("settings:updated",function(b){-1===a.updateMsgs.indexOf(b)&&a.updateMsgs.push({msg:"Your settings have been saved."})}),a.clearUpdated=function(){a.userUpdated=!1},a.login=function(){a.user=c.login({username:a.username,password:a.password}),a.rememberMe&&(e.username=a.username,e.password=a.password,e.rememberMe="true")},a.register=function(){a.user=c.register({username:a.username,password:a.password})},a.logout=function(){a.user=c.logout(),e.username="",e.password="",e.rememberMe=""},a.navClass=function(a){var c=b.path().substring(1)||"home";return a===c?"active":""},a.rememberMe&&a.login()}]),angular.module("scrollstoolboxApp").service("user",["$http","$rootScope","socket",function(a,b,c){function d(a){for(var b in a)f[b]=a[b];a.settings||c.emit("settings:update",{settings:f.settings})}var e={error:!1,authed:!1,settings:{theme:"dark",separator:" // ",buyPrependText:"WTB >>> ",buyAppendText:"",sellPrependText:"WTS >>> ",sellAppendText:"",buyModifier:0,sellModifier:0,buyPModifier:0,sellPModifier:0,buyAt:"low",sellAt:"high",buyCommon:!0,buyUncommon:!0,buyRare:!0,sellCommon:!0,sellUncommon:!0,sellRare:!0,gPrefix:" (",gSuffix:"g)",qPrefix:"",qSuffix:"x ",includeEnergy:!0,includeOrder:!0,includeGrowth:!0,minPrice:0,maxPrice:5e4,buytier1:!0,buytier2:!1,buytier3:!1,selltier1:!0,selltier2:!1,selltier3:!1,tier2multiplier:3,tier3multiplier:9,tierPrefix:"[t",tierSuffix:"]",buyMax:3}},f=angular.copy(e);return c.on("user:error",function(a){f.error=a.error}),c.on("user:registered",d),c.on("user:updated",d),c.on("user:login",d),c.on("collection:synced",function(){f.synced=!0}),{get:function(){return f},login:function(a){return f.error=!1,c.emit("user:login",a),f},register:function(a){return f.error=!1,c.emit("user:register",a),f},forgotPassword:function(a){return c.emit("user:forgot-password",{email:a}),f},logout:function(){c.emit("user:logout",{username:f.username});var a;for(a in f)f.hasOwnProperty(a)&&delete f[a];for(a in e)e.hasOwnProperty(a)&&(f[a]=e[a]);return f},update:function(){c.emit("user:update",{inGameName:f.inGameName,email:f.email,username:f.username,newPassword:f.password,settings:f.settings})},updateSettings:function(){c.emit("settings:update",{settings:f.settings})}}}]),function(){var a;angular.module("scrollstoolboxApp").service("socket",["$rootScope",function(b){return a="undefined"==typeof io||a?{on:function(){},emit:function(){}}:io.connect("",{port:9e3}),{on:function(c,d){a.on(c,function(){var c=arguments;b.$apply(function(){d.apply(a,c)})})},emit:function(c,d,e){a.emit(c,d,function(){var c=arguments;b.$apply(function(){e&&e.apply(a,c)})})}}}])}(),angular.module("scrollstoolboxApp").controller("AccountCtrl",["$scope","$location","user",function(a,b,c){a.user=c.get(),a.$watch("user.authed",function(){a.user.authed||b.path("/")}),a.$watch("user.email",function(){a.emailEdited=a.user.email}),a.$watch("user.inGameName",function(){a.inGameNameEdited=a.user.inGameName}),a.edit=function(b){a[b+"Editing"]=!0},a.close=function(b){a[b+"Editing"]=!1,a[b+"Edited"]=a.user[b]},a.save=function(b){a.user[b]=a[b+"Edited"],c.update(),a.close(b)}}]),angular.module("scrollstoolboxApp").controller("ForgotPasswordCtrl",["$scope","$location","user",function(a,b,c){a.user=c.get(),a.$watch("user.authed",function(){a.user.authed&&b.path("/account")}),a.email="",a.resetPassword=function(){a.user=c.forgotPassword(a.email)}}]),angular.module("scrollstoolboxApp").controller("FaqCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("scrollstoolboxApp").service("cards",["$http","$rootScope","socket","user",function(a,b,c,d){function e(a){var b=["Common","Uncommon","Rare"],c=["Crone","Metal Wonder","Solemn Giant","Wings Shield"];for(var d in a)a[d].price.median=Math.floor((a[d].price.high+a[d].price.low)/2),a[d].resource=a[d].card.costenergy?"Energy":a[d].card.costgrowth?"Growth":"Order",a[d].card.rarity=b[a[d].card.rarity],a[d].card.costdecay&&c.push(d);return c.forEach(function(b){delete a[b]}),a}function f(){var a=0;for(var b in h.data)h.data[b].owned=0,h.data[b].tradeable=0,h.data[b].tier1=0,h.data[b].tier2=0,h.data[b].tier3=0,h.data[b].price&&(delete h.data[b].price.buyOverride,delete h.data[b].price.sellOverride),delete h.data[b].alwaysBuy,delete h.data[b].alwaysSell,a++;a&&i.owned&&i.owned.forEach(function(a){for(var b in a)a.hasOwnProperty(b)&&"undefined"!=typeof a[b]&&(-1!==b.indexOf("Override")?h.data[a.name].price[b]=a[b]:h.data[a.name][b]=a[b])})}var g={error:!1,data:{},owned:[],fetched:!1},h=angular.copy(g),i=d.get();return c.on("user:registered",f),c.on("user:login",f),c.on("user:logged-out",f),c.on("cards:all",function(a){h.data=e(a),f()}),c.on("card:saved",function(){}),{get:function(){return h.fetched||(c.emit("cards:all"),h.fetched=!0),h},save:function(a){return c.emit("card:save",{name:a.card.name,owned:a.owned,tier1:a.tier1,tier2:a.tier2,tier3:a.tier3,tradeable:a.tradeable,buyOverride:a.price.buyOverride,sellOverride:a.price.sellOverride,alwaysSell:a.alwaysSell,alwaysBuy:a.alwaysBuy}),h}}}]),angular.module("scrollstoolboxApp").controller("CollectionCtrl",function(){}),angular.module("scrollstoolboxApp").filter("price",function(){return function(a){var b="";return a&&(b=a.low===a.high?a.low:a.low+"-"+a.high),b}}),angular.module("scrollstoolboxApp").directive("ownedColor",function(){return{link:function(a,b,c){a.$watch(c.ownedColor,function(a){$(b).removeClass("owned-colors-missing").removeClass("owned-colors-playset").removeClass("owned-colors-extras"),0===a?$(b).addClass("owned-colors-none"):3>a?$(b).addClass("owned-colors-missing"):3===a?$(b).addClass("owned-colors-playset"):a>3&&$(b).addClass("owned-colors-extras")})}}}),angular.module("scrollstoolboxApp").directive("rarityColor",function(){return{link:function(a,b,c){a.$watch(c.rarityColor,function(a){a&&$(b).addClass("rarity-"+a.toLowerCase())})}}}),angular.module("scrollstoolboxApp").directive("factionColor",function(){return{link:function(a,b,c){a.$watch(c.factionColor,function(a){a&&$(b).addClass("faction-"+a.toLowerCase())})}}}),angular.module("scrollstoolboxApp").directive("imagePopup",function(){return{link:function(a,b,c){a.$watch(c.imagePopup,function(a){a&&$(b).popover({html:!0,content:'<img src="'+a+'" />',trigger:"hover",placement:"right",container:".image-popup-container"})})}}}),angular.module("scrollstoolboxApp").controller("CollectionGoldCtrl",["$scope","cards",function(a,b){a.data=b.get(),a.playsetGold=function(){var b=0,c=0;for(var d in a.data.data)a.data.data[d].owned<3&&(b+=a.data.data[d].price.low*(3-a.data.data[d].owned),c+=a.data.data[d].price.high*(3-a.data.data[d].owned));return{low:b,high:c}},a.sellGold=function(){var b=0,c=0;for(var d in a.data.data)a.data.data[d].owned>3&&(b+=a.data.data[d].price.low*(a.data.data[d].owned-3),c+=a.data.data[d].price.high*(a.data.data[d].owned-3));return{low:b,high:c}},a.binderGold=function(){var b=0,c=0;for(var d in a.data.data)b+=a.data.data[d].price.low*a.data.data[d].owned,c+=a.data.data[d].price.high*a.data.data[d].owned;return{low:b,high:c}}}]),angular.module("scrollstoolboxApp").directive("selectOnClick",function(){return function(a,b){b.click(function(){b.select()})}}),angular.module("scrollstoolboxApp").controller("TableCtrl",["$scope","cards",function(a,b){function c(){var b=[];for(var c in a.data.data)a.data.data[c].name=a.data.data[c].card.name,b.push(a.data.data[c]);b.sort(function(b,c){if("price"===a.sorting.option)return"asc"===a.sorting.order?b.price.median-c.price.median:c.price.median-b.price.median;var d={Common:1,Uncommon:2,Rare:3};return"rarity"===a.sorting.option?"asc"===a.sorting.order?d[b.card.rarity]-d[c.card.rarity]:d[c.card.rarity]-d[b.card.rarity]:"owned"===a.sorting.option?"asc"===a.sorting.order?b.owned-c.owned:c.owned-b.owned:-1!==a.sorting.option.indexOf("tier")?"asc"===a.sorting.order?b[a.sorting.option]-c[a.sorting.option]:c[a.sorting.option]-b[a.sorting.option]:b.card[a.sorting.option]===c.card[a.sorting.option]?0:"asc"===a.sorting.order?b.card[a.sorting.option]>c.card[a.sorting.option]?1:-1:b.card[a.sorting.option]<c.card[a.sorting.option]?1:-1}),a.sortedData=b}a.data=b.get(),a.sortedData=[],a.tableView="all",a.showOrder=!0,a.showEnergy=!0,a.showGrowth=!0,a.sorting={option:"name",order:"asc"},a.generateImagePath=function(a){return a?"/img/scrolls-cards/"+a.toLowerCase().replace(/ /g,"").replace(/'/g,"")+".png":void 0},a.save=function(c){b.save(a.data.data[c])},a.tabIndex=function(b,c){return a.countCards()*c+b},a.countCards=function(){if(a.numCards)return a.numCards;var b,c=0;for(b in a.data.data)c++;return a.numCards=c,a.numCards},a.total=function(b){var c=0,d=0;for(var e in a.data.data)a.data.data[e].resource.toLowerCase()===b||"all"===b?c+=a.data.data[e].owned||0:"missing"===b&&a.data.data[e].owned<3?c+=3-a.data.data[e].owned||0:"duplicate"===b&&a.data.data[e].owned>3&&(c+=a.data.data[e].owned-3),d++;return c},a.setSort=function(b,d){a.sorting.option=b,a.sorting.order=d,c()},a.isActiveSort=function(b,c){return a.sorting.option===b&&a.sorting.order===c?!0:!1},a.$watch("data.data",c),a.inFiltered=function(b){return a.search&&b?-1===b.toLowerCase().indexOf(a.search.toLowerCase())?!1:!0:!0}}]),angular.module("scrollstoolboxApp").controller("WtswtbCtrl",["$scope","cards","socket","user",function(a,b,c,d){function e(b,c,d){return c.card.rarity===b&&a.u.settings[d+b]}function f(b,c){var d,e;return b.price[c+"Override"]?d=b.price[c+"Override"]:(d=Number(b.price[a.u.settings[c+"At"]]),e=Math.ceil(Number(a.u.settings[c+"PModifier"])?Number(a.u.settings[c+"PModifier"])/100*Number(d):0),d+=e,d+=Number(a.u.settings[c+"Modifier"])),d}function g(b,c,d,e){var f="buy"===d?a.wtb.length:a.wts.length,g="";return f>a.u.settings[d+"PrependText"].length&&(g+=a.u.settings.separator),("buy"===d&&!b.alwaysBuy||"sell"===d&&!b.alwaysSell)&&(g+=a.u.settings.qPrefix,g+="buy"===d?3-b["tier"+e]:b["tier"+e]-3,g+=a.u.settings.qSuffix),g+=e>1?a.u.settings.tierPrefix+String(e)+a.u.settings.tierSuffix:"",g+=b.name,g+=a.u.settings.gPrefix,g+=c,g+=a.u.settings.gSuffix}function h(b,c,d,f){return("sell"===d||"buy"===d&&b.owned<a.u.settings.buyMax)&&(e("Common",b,d)||e("Uncommon",b,d)||e("Rare",b,d))&&("Order"===b.resource&&a.u.settings.includeOrder||"Energy"===b.resource&&a.u.settings.includeEnergy||"Growth"===b.resource&&a.u.settings.includeGrowth)&&c>=a.u.settings.minPrice&&c<a.u.settings.maxPrice&&a.u.settings[d+"tier"+f]}function i(){d.updateSettings(),a.wtb=a.u.settings.buyPrependText,a.wts=a.u.settings.sellPrependText;for(var b in a.data.data)if(a.data.data.hasOwnProperty(b)&&b){var c=a.data.data[b],e=f(c,"buy"),i=f(c,"sell");(c.tier1<3||c.alwaysBuy)&&h(c,e,"buy",1)&&(a.wtb+=g(c,e,"buy",1)),(c.tier1>3||c.alwaysSell&&c.tier1)&&h(c,i,"sell",1)&&(a.wts+=g(c,i,"sell",1));var j=e*a.u.settings.tier2multiplier,k=i*a.u.settings.tier2multiplier;(c.tier2<3||c.alwaysBuy)&&h(c,j,"buy",2)&&(a.wtb+=g(c,j,"buy",2)),(c.tier2>3||c.alwaysSell&&c.tier2)&&h(c,k,"sell",2)&&(a.wts+=g(c,k,"sell",2));var l=e*a.u.settings.tier3multiplier,m=i*a.u.settings.tier3multiplier;(c.tier3<3||c.alwaysBuy)&&h(c,l,"buy",3)&&(a.wtb+=g(c,l,"buy",3)),(c.tier3>3||c.alwaysSell&&c.tier3)&&h(c,m,"sell",3)&&(a.wts+=g(c,m,"sell",3))}a.wtb+=a.u.settings.buyAppendText,a.wts+=a.u.settings.sellAppendText}a.u=d.get(),a.data=b.get(),a.tableView="all",a.columnTradeableHide=!1,a.columnTiersHide=!1,a.showOrder=!0,a.showEnergy=!0,a.showGrowth=!0,a.wtb="",a.wts="",c.on("card:saved",i),c.on("user:login",i),c.on("cards:all",i),c.on("user:error",i),a.$watch("u.settings.separator + u.settings.buyPrependText + u.settings.buyAppendText + u.settings.sellPrependText + u.settings.sellAppendText + u.settings.buyModifier + u.settings.sellModifier + u.settings.buyPModifier + u.settings.sellPModifier + u.settings.buyAt + u.settings.sellAt + u.settings.buyCommon + u.settings.buyUncommon + u.settings.buyRare + u.settings.sellCommon + u.settings.sellUncommon + u.settings.sellRare + u.settings.gPrefix + u.settings.gSuffix + u.settings.qPrefix + u.settings.qSuffix + u.settings.includeEnergy + u.settings.includeOrder + u.settings.includeGrowth + u.settings.minPrice + u.settings.maxPrice + u.settings.buytier1 + u.settings.buytier2 + u.settings.buytier3 + u.settings.selltier1 + u.settings.selltier2 + u.settings.selltier3 + u.settings.tier2multiplier + u.settings.tier3multiplier + u.settings.tierPrefix + u.settings.tierSuffix + u.settings.buyMax",i)}]),angular.module("scrollstoolboxApp").controller("LoggedInCtrl",["$scope","user",function(a,b){a.userData=b.get()}]),angular.module("scrollstoolboxApp").controller("FooterCtrl",["$scope","socket",function(a,b){a.userCount=0,b.on("users:count",function(b){a.userCount=b.count}),b.emit("users:count")}]),angular.module("scrollstoolboxApp").controller("ContactCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("scrollstoolboxApp").directive("fadeOutRemove",function(){return{link:function(a,b,c){$(b).fadeOut(2e3,function(){a.$parent&&a.$apply(function(){a.$parent[c.removeFrom]=[]})})}}}),function(){angular.module("scrollstoolboxApp").directive("switchTheme",["user",function(a){function b(a){a.html("Switch to Light Theme")}function c(a){a.html("Switch to Dark Theme")}function d(a){return"light"===e.settings.theme?(c(a),void 0):(b(a),void 0)}var e=a.get();return{link:function(b,c){var f=$(c);b.$watch("user.settings",function(){d(f)}),f.click(function(){e.settings.theme="dark"===e.settings.theme?"light":"dark",a.updateSettings(),d(f)})}}}])}(),function(){angular.module("scrollstoolboxApp").directive("bodyTheme",["user","socket",function(a,b){function c(){$("#darkstrap").length||(f.append(g),f.addClass("dark"))}function d(){$("#darkstrap").length&&($("#darkstrap").remove(),f.removeClass("dark"))}function e(){return"light"===h.settings.theme?(d(),void 0):(c(),void 0)}var f,g,h=a.get();return b.on("user:login",e),b.on("settings:updated",e),b.on("settings:error",e),{link:function(){g=$("#darkstrap").clone(),f=$("body"),e()}}}])}(),angular.module("scrollstoolboxApp").controller("GameAnalyzerCtrl",["$scope","game",function(a,b){a.game=b.get(),a.getEffect=function(a){if(a.msg)return a.msg;for(var b in a)return b};var c={TurnBegin:function(b){return"Begin "+a.game.players[b.TurnBegin.color]+"'s Turn.  Turn "+b.TurnBegin.turn+", Round "+Math.ceil(b.TurnBegin.turn/2)},ResourcesUpdate:function(b){var c="Resources Updated: ";return c=a.game.players.white+":",c+=" G "+b.ResourcesUpdate.whiteAssets.availableResources.GROWTH+"/"+b.ResourcesUpdate.whiteAssets.outputResources.GROWTH,c+=" E "+b.ResourcesUpdate.whiteAssets.availableResources.ENERGY+"/"+b.ResourcesUpdate.whiteAssets.outputResources.ENERGY,c+=" O "+b.ResourcesUpdate.whiteAssets.availableResources.ORDER+"/"+b.ResourcesUpdate.whiteAssets.outputResources.ORDER,c+=" D "+(b.ResourcesUpdate.whiteAssets.availableResources.DECAY||0)+"/"+(b.ResourcesUpdate.whiteAssets.outputResources.DECAY||0),c+=" -- ",c+=a.game.players.black+":",c+=" G "+b.ResourcesUpdate.blackAssets.availableResources.GROWTH+"/"+b.ResourcesUpdate.blackAssets.outputResources.GROWTH,c+=" E "+b.ResourcesUpdate.blackAssets.availableResources.ENERGY+"/"+b.ResourcesUpdate.blackAssets.outputResources.ENERGY,c+=" O "+b.ResourcesUpdate.blackAssets.availableResources.ORDER+"/"+b.ResourcesUpdate.blackAssets.outputResources.ORDER,c+=" D "+(b.ResourcesUpdate.blackAssets.availableResources.DECAY||0)+"/"+(b.ResourcesUpdate.blackAssets.outputResources.DECAY||0)},GameChatMessage:function(a){return a.from+": "+a.text}};a.makeCopy=function(b){var d=a.getEffect(b);return c[d]?c[d](b):b}}]),angular.module("scrollstoolboxApp").service("game",["$http","$rootScope","socket",function(a,b,c){function d(a){f.version=a[0].version,f.players={white:a[1].white,black:a[1].black},f.gameType=a[1].gameType,a.splice(0,4),f.game=a}var e={error:!1,game:[],players:{white:"",black:""},version:0,gameType:""},f=angular.copy(e);return c.on("user:error",function(a){f.error=a.error}),c.on("game:data",d),{get:function(a){return f.error=!1,c.emit("game:get",a),f}}}]),angular.module("scrollstoolboxApp").controller("SetInGameNameDialogCtrl",["$scope","dialog",function(a,b){a.close=function(a){b.close(a)}}]),angular.module("scrollstoolboxApp").controller("RegisterDialogCtrl",["$scope","$location","user","socket","dialog",function(a,b,c,d,e){function f(){a.username="",a.password=""}a.user=c.get(),a.username="",a.password="",a.$watch("user.authed",function(){a.user.authed&&f()}),a.register=function(){a.user=c.register({username:a.username,password:a.password})},a.$watch("user.authed",function(){a.user.authed&&a.close(a.user.username)}),a.close=function(a){e.close(a)}}]),angular.module("scrollstoolboxApp").controller("DownloadDialogCtrl",["$scope","dialog",function(a,b){a.close=function(a){b.close(a)}}]),angular.module("scrollstoolboxApp").controller("EnableSyncCtrl",["$scope","dialog",function(a,b){a.close=function(a){b.close(a)}}]),angular.module("scrollstoolboxApp").controller("FlashMsgCtrl",["$scope","flashMsg",function(a,b){a.flashMsg=b.get()}]),angular.module("scrollstoolboxApp").service("flashMsg",["$http","$timeout",function(a,b){function c(){a.get("/flash-msg.json").success(function(a){a.msg!==d.msg&&(d.show=!0),d.msg=a.msg,b(c,6e4)}).error(function(){console.log("err"),d.msg="",d.show=!1})}var d={msg:"",show:!1};return c(),{get:function(){return d}}}]),angular.module("scrollstoolboxApp").controller("CollectionListCtrl",["$scope","collectionList","$routeParams",function(a,b,c){a.username=c.username,a.collection=b.get(a.username),a.generateImagePath=function(a){return a?"/img/scrolls-cards/"+a.toLowerCase().replace(/ /g,"").replace(/'/g,"")+".png":void 0}}]),angular.module("scrollstoolboxApp").factory("collectionList",["socket",function(a){var b={error:!1,msg:"",collection:[]};return a.on("collection:list",function(a){for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c])}),{get:function(c){return b.error=!1,b.msg="",b.collection=[],a.emit("collection:list",{username:c}),b}}}]),angular.module("scrollstoolboxApp").controller("ChangelogCtrl",["$scope","user",function(a,b){a.username="Tidwell",a.user=b.get(),a.$watch("user.username",function(){a.user.username&&(a.username=a.user.username)})}]);