/**
 * Generates voxel based characters as svgs
 * @singleton
 */
var BlockFont = (function () {

  // Instance stores a reference to the Singleton
  var instance;

  function init() {

    // test whether the symbol-svg exists on the page
    if ($('#symbol-svg').length == 0) {
      // if not, inject it
      $('body').prepend('<svg id="symbol-svg"></svg>');
    }

    // Private methods and variables

    /**
     * Injects the block for the given color into the #symbol-svg
     * @param  {HexString} color Color to inject
     */
    function injectBlock(color) {
      var str = '';

      str += '<symbol id="block-' + color + '" viewBox="0 0 100 100" overflow="visible">';

        str += '<polygon id="block-' + color + '-face-z"';
          str += 'vector-effect="non-scaling-stroke"';
          str += 'stroke-linejoin="round"';
          str += 'points="0,25 50,0 100,25 50,50 "';
          str += 'fill="#fff"';
          str += 'style="stroke:black; stroke-width:1"';
        str += '/>';
        str += '<polygon id="block-' + color + '-face-y"';
          str += 'vector-effect="non-scaling-stroke"';
          str += 'stroke-linejoin="round"';
          str += 'points="0,25 50,50 50,100 0,75 "';
          str += 'fill="#ccc"';
          str += 'style="stroke:black; stroke-width:1"';
        str += '/>';
        str += '<polygon id="block-' + color + '-face-x"';
          str += 'vector-effect="non-scaling-stroke"';
          str += 'stroke-linejoin="round"';
          str += 'points="50,50 100,25 100,75 50,100 "';
          str += 'fill="#999"';
          str += 'style="stroke:black; stroke-width:1"';
        str += '/>';

      str += '</symbol>';

      $('#symbol-svg').prepend(str);
    }

    /**
     * Injects the given glyph with the given color into the #symbol-svg
     * @param  {Char}       glyph Character to inject
     * @param  {HexString}  color Color to inject
     */
    function injectGlyph(glyph, color) {
        if ($('#block-' + color).length == 0) {
          injectBlock(color);
        }
        var str = '';

        str += '<symbol id="' + color + '-y-A" viewBox="0 0 60 95" overflow="visible">';
        str += '<use x=" 0" y="55" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x="40" y="75" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x=" 0" y="45" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x="40" y="65" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x=" 0" y="35" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x="10" y="40" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x="20" y="45" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x="30" y="50" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x="40" y="55" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x=" 0" y="25" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x="40" y="45" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x=" 0" y="15" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x="40" y="35" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x=" 0" y=" 5" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x="40" y="25" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x="10" y=" 0" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x="20" y=" 5" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '<use x="30" y="10" width="20" height="20" xlink:href="#block-' + color + '"/>';
        str += '</symbol>';

     $('#symbol-svg').append(str);

    }



    return {

      // public methods and variables

      /**
       * Injects symbols into the #symbol-svg if they don't exist and
       * returns an svg of the given character with the given color
       * using those symbols.
       *
       * @param  {Char}         glyph   The character to be drawn
       * @param  {HexString}    color   Hex string for the highlight color to draw
       * @return {String}               An svg of the character
       */
      writeGlyph: function(glyph, color) {

        if ($('#' + color + '-' + glyph).length == 0) {
          injectGlyph(glyph, color);
        }

        return '<svg width="80" height="100"><use x="0" y="0" width="80" height="100" xlink:href="#'
            + color + '-y-'
            + glyph + '"/></svg>';
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












