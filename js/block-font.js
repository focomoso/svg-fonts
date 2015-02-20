/**
 * Static class holdig the source arrays for the Block Font
 * @type {BlockSrc}
 */
var BlockSrc = {
  "a":  [
          [0,1,1,1,0],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,1,1,1,1],
          [1,0,0,0,1],
          [1,0,0,0,1]
        ],
  "b": [
          [1,1,1,1,0],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,1,1,1,0],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,1,1,1,0]
        ]
};

/**
 * Generates voxel based characters as svgs
 */
var BlockFont = (function() {

  var _this = this;

  /**
   * The width in px of each block
   * @type {Number}
   */
  this.blockW = 10;
  this.blockH = 10;
  this.color = "#ff0000";

  /**
   * Init
   * @param {number} bw Width of each block
   * @param {number} bh Height of each block
   * @param {string} bc Hex string for color
   */
  function BlockFont(bw, bh, bc) {

    if (typeof bw === 'undefined')
      _this.blockW = bw;

    if (typeof bh === 'undefined')
      _this.blockH = bh;

    if (typeof bc === 'undefined')
      _this.blockColor = bc;

  }

  /////////////////////////
  // getters and setters //
  /////////////////////////

  BlockFont.prototype.getColor = function() {
    return _this.color;
  };

  BlockFont.prototype.setColor = function(color) {
    _this.color = color;
  };

  return BlockFont;

})();