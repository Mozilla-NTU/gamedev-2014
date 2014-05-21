(function(exports) {
  function Drawable(ctx, image, width, height, x, y) {
    this.ctx = ctx;
    this.image = image || null;
    this.width = width || 0;
    this.height = height || 0;
    this.x = x || 0;
    this.y = y || 0;
  }

  Drawable.prototype.update = function(delta, deltaAll) {};

  Drawable.prototype.draw = function() {}

  exports.Drawable = Drawable;
})(this);
