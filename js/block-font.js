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
       * @return {Object}             An svg of the character
       */
      writeGlyph: function(glyph, color, dir, x, y) {
        var width = 80;
        var str = '<rect x="' + x + '" y="' + y + '" width="' + width + '" height="100" fill="#' + color + '"/>';
        return {
          svgStr: str,
          width: width
        };
      },

      /**
       * Writes an svg into the given selector with the given string with the given color
       * @param  {String} selector    The jQuery selector to write the string into
       * @param  {String} str         The string to write
       * @param  {String} color       Hex color of the highlight
       * @param  {String} charDir     The orientation of the character 'x'=\ 'y'=/ 'zx'= facing |, top \ zy'= facing |, top /
       * @param  {String} stringDir   The direction of the entire string 'x'= \; 'y'= /; 'z'= |; 'h'= -;
       *                                note: charDir y will usually want to go in stringDir x
       * @param  {Number} charHeight  The preffered height of each character
       * @return {Object}             The svg string, width and height of the final svg.
       */
      writeString: function(selector, str, color, charHeight, charDir, stringDir) {

        var x = y = 0;
        var width = height = 0;
        var bodyStr = '';

        $(selector).empty();

        var strData = str.split('');

        $.each(strData, function(i,v){
          glyph = instance.writeGlyph(v, color, charDir, i*100, 0);
          bodyStr += glyph.svgStr;
          width += glyph.width;
        });

        svgStr = '<svg width="' + width + '" height="120" overflow="visible">'
            + bodyStr
            + "</svg>";

        $(selector).append(svgStr);

        return {
          str: svgStr,
          width: width,
          height: height
        };
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












