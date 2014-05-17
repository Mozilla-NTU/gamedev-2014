(function(exports) {
  'use strict';

  var SCREEN_WIDTH = 700;
  var SCREEN_HEIGHT = 400;

  function Game() {
    this.running = false;
    this.height = SCREEN_HEIGHT;
    this.width = SCREEN_WIDTH;
    document.addEventListener('DOMContentLoaded', this.init.bind(this));
  }

  /**
   * Initialize game state
   */
  Game.prototype.init = function() {
    this.stage = document.getElementById('container');
    this.startScreen = new StartScreen(this.stage);
    this.bird = new Bird(this.stage);
    this.collider = new Collider(this.bird);

    //this.FPS = new FPS();

    // overlap intercepts all touch events, and cancels them for performance
    this.overlay = document.getElementById('overlay');
    ['touchstart',
     'mousedown'].forEach(
      function(eventName) {
        window.addEventListener(eventName, this, true);
      }.bind(this));

    this.pipes = [
      new Obstacle(this.stage),
      new Obstacle(this.stage),
      new Obstacle(this.stage),
    ];
    this.pipes.forEach(this.collider.addObject.bind(this.collider));

    this.clouds = [
      new Cloud(this.stage, 'med'),
      new Cloud(this.stage, 'large'),
      new Cloud(this.stage, 'small'),
    ];

    this.startScreen.button.addEventListener('click',
      this.startGame.bind(this));
    this.startScreen.screen.addEventListener('mousedown',
      this.startGame.bind(this));
    this.startScreen.screen.addEventListener('touchdown',
      this.startGame.bind(this));
    setTimeout(this.startGame.bind(this), 1000);
  };

  Game.prototype.handleEvent = function(evt) {
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    if (evt.type === 'touchstart' || evt.type ==='mousedown') {
      this.bird.flap();
    }
  }

  /**
   * update game state
   */
  Game.prototype.update = function(delta, deltaAll) {
    this.bird.update(delta, deltaAll);
    this.collider.update(delta, deltaAll);
  };

  Game.prototype.startGame = function() {
    this.running = true;
    this.startTime = this.lastNow = Date.now();
    this.startScreen.hide();
    this.currentType = 'top';

    setInterval(function() {
      var pipe = this.pipes.shift();
      pipe.setType(this.currentType);
      this.currentType = (this.currentType === 'top') ? 'bottom' : 'top';
      pipe.start();
      this.pipes.push(pipe);
    }.bind(this), 800);

    (function loop() {
      var now = Date.now();
      var delta = now - this.lastNow;
      this.update(delta, now - this.startTime);
      this.lastNow = now;
      if (this.running) {
        requestAnimationFrame(loop.bind(this));
      }
      //this.FPS.update(delta);
    }.bind(this))();
  };

  Game.prototype.endGame = function() {
    //document.body.style.background = utils.getRandomColor();
  };

  // Singleton
  exports.Game = new Game();

  function StartScreen(stage) {
    this.stage = stage;
    this.screen = document.createElement('div');
    this.screen.id = 'start-screen';
    this.button = document.createElement('button');
    this.button.textContent = 'Start';
    this.screen.appendChild(this.button);
    document.body.appendChild(this.screen);
  }

  StartScreen.prototype.hide = function() {
    this.screen.hidden = true;
  };

  StartScreen.prototype.show = function() {
    this.screen.hidden = false;
  };

}(this));
