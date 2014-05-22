(function(exports) {
  'use strict';

  function Animation(stage, width, height, sheetWidth, 
                     sheetHeight, frameCount, fps) {
    SpriteSheet.call(this, stage, width, height, 
      sheetWidth, sheetHeight, frameCount);
    this.fps = fps;
  }

  Animation.prototype = Object.create(SpriteSheet.prototype);

  Animation.prototype.update = function(delta, deltaAll) {
    this.setFrame(~~(this.fps * deltaAll) % this.frameCount);
  };

  exports.Animation = Animation;
})(this);
