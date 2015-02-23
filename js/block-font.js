/**
 * Generates voxel based characters as svgs
 * @singleton
 */
var BlockFont = (function () {

  // Instance stores a reference to the Singleton
  var instance;

  function init() {

    /**
     * Draws a block into the given svg
     * @param  {SVG Dom Object} svg   The svg to draw into
     * @param  {Number} x     X coordinates
     * @param  {Number} y     Y coordinates
     * @param  {Number} w     Width
     * @param  {Number} h     Height
     * @param  {String} color Hex color
     */
    function drawBlock(svg, x, y, w, h, color) {

    }



    return {

      // public methods and variables

      /**
       * Returns an svg of the given character with the given color
       * and direction.
       *
       * @param  {Char}       glyph   The character to be drawn
       * @param  {HexString}  color   Hex string for the highlight color to draw
       * @param  {String}     dir     The orientation of the character 'y'=/ 'x'=\ 'z'=| (z up)
       * @return {String}             An svg of the character
       */
      writeGlyph: function(glyph, color, dir) {
        var str = '<svg width="80" height="100">'
              + '<rect x="0" y="0" width="80" height="100">'
              + '</svg>';
        return str;
      },

      /**
       * Returns an svg of the given string with the given color
       * @param  {String} str   The string to write
       * @param  {String} color Hex string for the highlight color
       * @return {String}       An svg of the scring
       */
      writeString: function(str, color) {
        return '';
      }
    };
  };

  return {

    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {

      if ( !instance ) {
        instance = init();
      }

      return instance;
    }

  };

})();












