(function(exports) {
  'use strict';

  function FPS(stage) {
    this.container = document.createElement('div');
    this.container.id = 'fps';
    document.body.appendChild(this.container);

    this.threshold = 200;
    this.timeSinceLastUpdate = 0;
    this.framesSinceLastUpdate = 0;
  }

  FPS.prototype.update = function(delta) {
    ++this.framesSinceLastUpdate;
    this.timeSinceLastUpdate += delta;
    if (this.timeSinceLastUpdate > this.threshold) {
      this.container.textContent = ~~((1000 * this.framesSinceLastUpdate) /
                                   this.timeSinceLastUpdate);
      this.framesSinceLastUpdate = 0;
      this.timeSinceLastUpdate = 0;
    }
  }

  exports.FPS = FPS;
})(this);
