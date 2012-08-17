var Game = Game || {};

Game.Entity = function () {
   this.speed = 0;
   this.direction = 45;
   this.width = 0;
   this.height = 0;
   this.position = { x: 0, y: 0 };
}

Game.Entity.prototype.render = function () { }

Game.Entity.prototype.update = function (elapsed) {
   var speedx = Math.cos(this.direction * Math.PI / 180) * this.speed;
   var speedy = Math.sin(this.direction * Math.PI / 180) * this.speed;

   this.position.x = this.position.x + (speedx * elapsed);
   this.position.y = this.position.y + (speedy * elapsed);
}

Game.Sprite = (function () {

   Extends(Sprite, Game.Entity);
   
   function Sprite (width, height) {
      Sprite._super.constructor.call(this);

      this.width = width;
      this.height = height;
   }

   Sprite.prototype.render = function (context) {
      context.fillStyle = "#FF0000";
      context.fillRect(this.position.x, this.position.y, this.width, this.height);
   }

   return Sprite;
})();
