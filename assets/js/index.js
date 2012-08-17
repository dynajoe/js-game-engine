var GameLoop = function (controller) {
   this.controller = controller;
};

GameLoop.prototype.run = function () {

   window.requestAnimFrame = (function () {
     return  window.requestAnimationFrame       ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame    ||
             window.oRequestAnimationFrame      ||
             window.msRequestAnimationFrame     ||
             function (callback) {
                window.setTimeout(function () { callback(new Date().getTime()); }, 1000 / 60);
             };
   })();

   var loop = this;

   (function animloop (now) {

      requestAnimFrame(animloop);

      if (!loop.lastTime) {
         loop.lastTime = now;
      } else {
         loop.lastTime = loop.time;
      }

      loop.time = now;

      var timeInfo = { elapsed: loop.time - loop.lastTime, current: loop.time };

      loop.controller.update.call(loop.controller, timeInfo);

   })();
}

window.onload = function () {
   var controller = new StupidGame(document.getElementById('game-board'));
   new GameLoop(controller).run();
};
