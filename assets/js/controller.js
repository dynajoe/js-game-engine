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
   
   for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].update.call(this.entities[i], time.elapsed);
   }
   
   this.context.clearRect(0, 0, this.gameboard.width, this.gameboard.height);

   for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].render.call(this.entities[i], this.context);
   }

};

var StupidGame = (function () {
   
   Extends(StupidGame, Game.Controller);
   
   function StupidGame () {
      
      StupidGame._super.constructor.apply(this, arguments);

      this.entities.push(new Game.Sprite(100,100));

   }

   StupidGame.prototype.update = function(time) {
      var keys = this.activeKeys();

      if (keys.any) { 
         console.log(keys);
      }
   };

   return StupidGame;

})();