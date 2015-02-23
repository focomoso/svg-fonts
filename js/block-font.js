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
       * @param  {String}     dir     The orientation of the character 'x'=\ 'y'=/ 'zx'= facing |, top \ zy'= facing |, top /
       * @return {String}             An svg of the character
       */
      writeGlyph: function(glyph, color, dir, x, y) {
        var str = '<rect x="' + x + '" y="' + y + '" width="80" height="100" fill="red"/>';
        return str;
      },

      /**
       * Returns an svg of the given string with the given color
       * @param  {String} str       The string to write
       * @param  {String} color     Hex string for the highlight color
       * @param  {String} charDir   The orientation of the character 'x'=\ 'y'=/ 'zx'= facing |, top \ zy'= facing |, top /
       * @param  {String} stringDir The direction of the entire string 'x'= \; 'y'= /; 'z'= |; 'h'= -;
       * note: charDir y will usually want to go in stringDir x
       * @return {String}           An svg of the scring
       */
      writeString: function(str, color, charDir, stringDir) {
        svgStr = '<svg width="600" height="120">';

        var strData = str.split('');

        $.each(strData, function(i,v){
          svgStr += instance.writeGlyph(v, color, charDir, i*100, 0);
        });
        svgStr += "</svg>";

        return svgStr;
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












