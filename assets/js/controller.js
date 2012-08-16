var Game = Game || {};

Game.Controller = function () { }

Game.Controller.prototype.constructor = function (gameboard) {
   this.gameboard = gameboard;
   this.context = gameboard.getContext("2d");
   this.entities = [];
};

Game.Controller.prototype.onInput = function () {}

Game.Controller.prototype.update = function (time) {
   
   for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].update.call(this.entities[i], time.elapsed);
   }
   
   this.context.clearRect(0, 0, this.gameboard.width, this.gameboard.height);

   for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].render.call(this.entities[i], this.context);
   }

};

var Keys = {
   "LEFT": 37,
   "RIGHT": 39,
   "UP": 38,
   "DOWN": 40,
   "ENTER": 13,
   "SPACE": 32,
   "ESCAPE": 27
};

var StupidGame = (function () {
   
   Extends(StupidGame, Game.Controller);
   
   function StupidGame () {
      
      StupidGame._super.constructor.apply(this, arguments);

      this.entities.push(new Game.Sprite(100,100));

   }

   StupidGame.prototype.onInput = function (e) {

      switch (e.which) {
         case Keys.LEFT:
            this.entities[0].position.x -= 1;
         break;
         case Keys.RIGHT:
            this.entities[0].position.x += 1;
         break;
         case Keys.UP:
            this.entities[0].position.y -= 1;
         break;
         case Keys.DOWN:
            this.entities[0].position.y += 1;
         break;
      }

   }

   return StupidGame;

})();