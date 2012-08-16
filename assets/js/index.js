var GameLoop = function (controller) {
   this.controller = controller;
};

GameLoop.prototype.run = function () {

   var loop = this;

   $(document).keydown(function () { 
      loop.controller.onInput.apply(loop.controller, arguments);
   });   
   
   function Loop() {

      var now = new Date().getTime();

      if (!loop.lastTime) {
         loop.lastTime = now;
      } else {
         loop.lastTime = loop.time;
      }

      loop.time = now;

      var time = { elapsed: loop.time - loop.lastTime, current: loop.time };

      loop.controller.update.call(loop.controller, time);

      setTimeout(Loop, 10);
   }

   Loop();
}

$(document).ready(function() {
   var controller = new StupidGame(document.getElementById('game-board'));
   new GameLoop(controller).run();
});