var Game = Game || {};

Game.Controller = function () { }

Game.Controller.prototype.constructor = function (gameboard) {
   this.gameboard = gameboard;
   this.context = gameboard.getContext("2d");
   this.entities = [];
};

Game.Controller.prototype.activeKeys = function () {
   var keys = KeyboardJS.activeKeys();
   var activeKeys = {};
  
   keys.forEach(function (k) {
      activeKeys[k] = true;
   });

   activeKeys.any = keys.length > 0;

   return activeKeys;
};

Game.Controller.prototype.update = function (time) {

   var context = this.context;
   
   //There's no way to set the zindex of an item on the HTML5 Canvas
   //We'll batch the rendering so that the z order of each item can be determined before drawing.
   var batch = [];
   
   this.entities.forEach(function (e) {
      e.update.call(e, time.elapsed);

      if (!batch[e.zindex]) {
         batch[e.zindex] = [e];
      } else {
         batch[e.zindex].push(e);         
      }
   });
   
   context.clearRect(0, 0, this.gameboard.width, this.gameboard.height);
   
   batch.forEach(function (b) {
      b.forEach(function (e) {
         e.render.call(e, context);
      });
   });
};

var StupidGame = (function () {
   
   Extends(StupidGame, Game.Controller);
   
   function StupidGame () {
      
      StupidGame._super.constructor.apply(this, arguments);

      this.entities.push(new Game.Sprite(100,100));

   }

   StupidGame.prototype.update = function (time) {
      StupidGame._super.update.call(this, time);

      var keys = this.activeKeys();
   };

   return StupidGame;

})();