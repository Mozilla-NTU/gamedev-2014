function Ball () {
  this.x = 0;
  this.y = 0;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.radius = 40;
}

Ball.prototype.draw = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.rotation);
  ctx.scale(this.scaleX, this.scaleY);  
  ctx.fillStyle = "#f00";
  ctx.beginPath();
  ctx.arc(0, 0, this.radius, 0, (Math.PI*2), true);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};
