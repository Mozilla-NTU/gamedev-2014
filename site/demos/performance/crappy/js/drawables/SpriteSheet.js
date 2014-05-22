(function(exports) {
  'use strict';

  function SpriteSheet(stage, width, height, sheetWidth,
                       sheetHeight, frameCount) {
    this.stage = stage;
    this.actor = document.createElement('div');
    this.width = width;
    this.height = height;
    this.sheetWidth = sheetWidth;
    this.sheetHeight = sheetHeight;

    this.frameCount = frameCount;
    this.framesPerRow = Math.floor(this.sheetWidth / this.width);
    this.setFrame(0);
  }

  SpriteSheet.prototype.setFrame = function(frameNumber) {
    if (frameNumber === this.currentFrame) {
      return;
    }
    this.currentFrame = frameNumber;
    var offsetX =
      (this.currentFrame % this.framesPerRow) * this.width;
    var offsetY =
      Math.floor(this.currentFrame / this.framesPerRow) * this.height;

    this.actor.style.backgroundPosition =
      '' + -offsetX + 'px ' +
           -offsetY + 'px';
  };

  exports.SpriteSheet = SpriteSheet;
})(this);
