/**
 * Generates voxel based characters as svgs
 * @singleton
 */
var BlockFont = (function () {

  // Instance stores a reference to the Singleton
  var instance;

  function init() {

    // Private methods and variables
    function privateMethod(){
        console.log( "I am private" );
    }

    var privateVariable = "Im also private";

    var privateRandomNumber = Math.random();

    return {

      // public methods and variables

      /**
       * Writes the svg symbols into the dom
       * Note: maybe just include external svg and change color on the fly
       * @return {[type]} [description]
       */
      writeSymbols: function() {
        return '';
      },

      /**
       * Returns an svg of the given character with the given color
       * @param  {Char}     glyph   The character to be drawn
       * @param  {String}   color   Hex string for the highlight color to draw
       * @return {String}           An svg of the character
       */
      writeGlyph: function(glyph, color) {
        return '<svg width="80" height="100"><use x="0" y="0" width="80" height="100" xlink:href="#white-A"/></svg>';
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












