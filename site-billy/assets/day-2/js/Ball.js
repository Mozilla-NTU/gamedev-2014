function Ball () {
  this.x = 0;
  this.y = 0;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.vx = 0;
  this.vy = 0;
  this.radius = 40;
}

Ball.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.rotation);
  context.scale(this.scaleX, this.scaleY);  
  context.fillStyle = "#f00";
  context.beginPath();
  context.arc(0, 0, this.radius, 0, (Math.PI*2), true);
  context.closePath();
  context.fill();
  context.stroke();
  context.restore();
};
