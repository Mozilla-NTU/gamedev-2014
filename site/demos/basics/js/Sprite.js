/**
 * A Sprite plays a collection of animation sequences using a spritesheet image.
 * @param {string|Image} imageURL Image URL location or Image element for spritesheet.
 * @param options
 * @param options.width       Width of the sprite object.
 * @param options.height      Height of the sprite object.
 * @param options.rows        Number of rows in spritesheet (animation sequences)
 * @param options.cols        Number of columns in spritesheet (frames in an animation)
 * @param options.cellWidth   (optional) Width of a single animation cell, default to sprite width.
 * @param options.cellHeight  (optional) Height of a single animation cell, default to sprite height.
 * @param options.cellOffsetX (optional) Horizontal offset of the image within its cell, default to 0.
 * @param options.cellOffsetY (optional) Vertical offset of the image within its cell, default to 0.
 */
function Sprite (imageURL, options) {
  //contains information about the frame dimensions for the spritesheet image
  this._data = options || {};
  //set up values for a single frame of animation. use defaults if not provided
  if (typeof this._data.width !== 'number') this._data.width = 0;
  if (typeof this._data.height !== 'number') this._data.height = 0;
  if (typeof this._data.rows !== 'number') this._data.rows = 0;
  if (typeof this._data.cols !== 'number') this._data.cols = 0;
  if (typeof this._data.cellWidth !== 'number') this._data.cellWidth = this._data.width;
  if (typeof this._data.cellHeight !== 'number') this._data.cellHeight = this._data.height;
  if (typeof this._data.cellOffsetX !== 'number') this._data.cellOffsetX = 0;
  if (typeof this._data.cellOffsetY !== 'number') this._data.cellOffsetY = 0;

  //screen position
  this.x = 0;
  this.y = 0;
  this.width = this._data.width;
  this.height = this._data.height;

  //transforms
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;

  //velocity to apply on frame animation
  this.vx = 0;
  this.vy = 0;
  
  //load spritesheet image
  this.imageLoaded = false;
  this._image = null;
  this.setImage(imageURL);

  //position on the spritesheet to begin drawing from
  //used to determine the animation sequence and frame
  this._imageOffsetX = 0;
  this._imageOffsetY = 0;
  
  //the player timeline of an animation sequence
  this.isPlaying = false;
  this.counter = 0;                     //Updated every frame that a sequence is being played. From 0 to this.sampleEnd.
  this.sampleRate = options.sampleRate || 5;                  //The amount of frames to play each sample cell before transitioning to the next. The higher the number, the slower the walk cycle.
  this.sampleChange = this.sampleRate;  //The next change point on the timeline that will cause a sample transition.
  this.sampleEnd = this.sampleRate * this._data.cols; //The end of the timeline.
}

/**
 * Set the spritesheet using a URL string or an Image element.
 * @param {url|Image} img
 */
Sprite.prototype.setImage = function (img) {
  this.imageLoaded = false;
  if (img instanceof Image && img.complete === true) {
    this._image = img;
    this.imageLoaded = true;
  } else if (typeof img === 'string') {
    this._image = new Image();
    this._image.onload = (function () {
      this.imageLoaded = true;
    }).bind(this);
    this._image.src = img;
  } else {
    throw new TypeError("Image must be a URL string or an already loaded Image element.");
  }
};

/**
 * Select an animation sequence to play, as grouped by rows on the spritesheet.
 * @param {number} row Animation sequence row to play.
 */
Sprite.prototype.play = function (row) {
  if (row < 0 || row > (this._data.rows - 1)) {
    throw new RangeError("Invalid row sequence: " + row);
  }
  
  /* The spritesheet is grouped by rows, and each row contains a sequence of cells for
   * animating a particular direction. When picking a direction to animate, determine
   * the row's y-offset on the sprite sheet.
   */
  this._imageOffsetY = row * this._data.cellHeight;

  /* If this is the first play, position the player head right before the first change point.
   * Now there's an immediate animation transition instead of waiting through all the frames of the first sample.
   */
  if (!this.isPlaying) {
    this.counter = this.sampleRate - 1;
    this.isPlaying = true;
  }
};

/**
 * Stop playing the animation and reset the sample sequence.
 */
Sprite.prototype.stop = function () {
  this.isPlaying = false;
  this.resetCounter();
};

/**
 * Resets the counter and x-offset on the spritesheet to point to the first sample of the animation sequence.
 */
Sprite.prototype.resetCounter = function () {
  this.counter = 0;
  this._imageOffsetX = 0;
  this.sampleChange = this.sampleRate;
};

/**
 * Keeps track of the frame counter and timeline change points.
 * Each sample cell in an animation sequence is rendered a set amount of
 * frames (as determined by this.sampleRate) before moving on to the next
 * sample. When the counter has reached the end of the sequence it is reset.
 */
Sprite.prototype.tick = function () { 
  if (this.counter === this.sampleEnd) {
    this.resetCounter();
  } else if (this.counter === this.sampleChange) {
    //once a change point has been reached,
    //update the x-offset on the spritesheet to point to a new sample cell.
    this._imageOffsetX += this._data.cellWidth;
    this.sampleChange += this.sampleRate; //set next change point
  }
  this.counter += 1;
};

/**
 * Render the sprite to the canvas.
 * @param {CanvasRenderingContext2D} ctx
 * @param {boolean} debug
 */
Sprite.prototype.draw = function (ctx, debug) {
  //apply velocity
  this.x += this.vx;
  this.y += this.vy;
  
  if (this.imageLoaded) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scaleX, this.scaleY);
  
    if (this.isPlaying === true) this.tick();

    /* Draws a slice from the source image to the canvas element destination.
     * This can be used to scale the image slice, which is the reason for some redundant arguments here.
     * Parameters: srcImage, srcImage_offsetX, srcImage_offsetY, srcImage_width, srcImage_height, dest_x, dest_y, dest_width, dest_height
     */
    ctx.drawImage(this._image,
                  this._imageOffsetX, this._imageOffsetY, this._data.cellWidth, this._data.cellHeight,
                  this._data.cellOffsetX, this._data.cellOffsetY, this._data.cellWidth, this._data.cellHeight);
    ctx.restore();
  }

  if (debug) this._debugDraw(ctx);
};

/**
 * Draw a bounding box around the sprite's width and height.
 * Useful for troubleshooting.
 * @param {CanvasRenderingContext2D} ctx
 */
Sprite.prototype._debugDraw = function (ctx) {
  ctx.save();
  //draw bounding box
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.stroke();
  //draw origin point
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(this.x, this.y, 3, 0, 2*Math.PI);
  ctx.fill();
  ctx.restore();
};
