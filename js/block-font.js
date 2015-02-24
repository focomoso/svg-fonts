/**
 * Generates voxel based characters as svgs
 * @singleton
 */
var BlockFont = (function () {

  // Instance stores a reference to the Singleton
  var instance;

  function init() {

    // private methods and variables

    /**
     * Takes a hex string and reduces it by ration
     * @param  {String} hStr  A two digit hex string ('00' to 'ff')
     * @param  {Number} ratio The amount to dim the string
     * @return {String}       The new, dimmed string
     */
    function dimStr(hStr, ratio) {
      var newStr = Math.round(parseInt(hStr, 16)*ratio).toString(16);
      return newStr.length == 1 ? newStr = '0' + newStr : newStr;
    }


    /**
     * Takes a hex color and shades it slightl
     * @param  {String} color Hex representation of a color
     * @return {String}       Hex representation of a darker color
     */
    function midShade(color) {


      var ratio = 0.7;

      return    dimStr(color.charAt(0) + color.charAt(1), ratio)
              + dimStr(color.charAt(2) + color.charAt(3), ratio)
              + dimStr(color.charAt(4) + color.charAt(5), ratio);
    }

    /**
     * Takes a hex color and shades it more
     * @param  {String} color Hex representation of a color
     * @return {String}       Hex representation of a darker color
     */
    function lowShade(color) {

      var ratio = 0.4;

      return    dimStr(color.charAt(0) + color.charAt(1), ratio)
              + dimStr(color.charAt(2) + color.charAt(3), ratio)
              + dimStr(color.charAt(4) + color.charAt(5), ratio);
    }


    /**
     * Returns
     * @param  {String} color Hex color
     * @param  {Number} x     X coordinates
     * @param  {Number} y     Y coordinates
     * @param  {Number} w     Width
     * @param  {Number} h     Height
     * @return {String}       SVG polygons that draws the block
     */
    function drawBlock( color, x, y, w, h ) {
      var str = '';

      str += '<polygon ';
      str += 'vector-effect="non-scaling-stroke" ';
      str += 'stroke-linejoin="round" ';
      str += 'points="'
                + (x+w*0.0 ) + ',' + (y+h*0.25) + ' '
                + (x+w*0.5 ) + ',' + (y+h*0.0 ) + ' '
                + (x+w*1.0 ) + ',' + (y+h*0.25) + ' '
                + (x+w*0.5 ) + ',' + (y+h*0.5) + ' " ';
      str += 'fill="#' + color + '" ';
      str += 'style="stroke:black; stroke-width:0.5" ';
      str += '/>';

      str += '<polygon ';
      str += 'vector-effect="non-scaling-stroke" ';
      str += 'stroke-linejoin="round" ';
      str += 'points="'
                + (x+w*0.0 ) + ',' + (y+h*0.25) + ' '
                + (x+w*0.5 ) + ',' + (y+h*0.5 ) + ' '
                + (x+w*0.5 ) + ',' + (y+h*1.0 ) + ' '
                + (x+w*0.0 ) + ',' + (y+h*0.75) + ' " ';
      str += 'fill="#' + midShade(color) + '" ';
      str += 'style="stroke:black; stroke-width:0.5" ';
      str += '/>';

      str += '<polygon ';
      str += 'vector-effect="non-scaling-stroke" ';
      str += 'stroke-linejoin="round" ';
      str += 'points="'
                + (x+w*0.5 ) + ',' + (y+h*0.5 ) + ' '
                + (x+w*1.0 ) + ',' + (y+h*0.25) + ' '
                + (x+w*1.0 ) + ',' + (y+h*0.75) + ' '
                + (x+w*0.5 ) + ',' + (y+h*1.0 ) + ' " ';
      str += 'fill="#' + lowShade(color) + '" ';
      str += 'style="stroke:black; stroke-width:0.5" ';
      str += '/>';

      return str;
    }


    return {

      // public methods and variables


      /**
       * [writeGlyph description]
       * @param  {Char}       glyph      The character to render
       * @param  {HexString}  color      Hex string for the highlight color
       * @param  {Number}     charHeight Hight of the character in px
       *                                 Note: this is the hight of the vertical axis of the char, not the size of the svg
       *                                       which may be greater because of the perspective.
       * @param  {String}     charDir    The orientation of the character:
       *                                     'x'=\ 'y'=/ 'zx'= facing |, top \ zy'= facing |, top /
       * @param  {Number}     x          X position
       * @param  {Number}     y          y position
       * @return {Object}                svgStr: An svg of the glyph; width: the total width of the glyph
       */
      writeGlyph: function( glyph, color, charHeight, charDir, x, y ) {
        var dim = charHeight/9;
        var width;
        var height;
        var str = '';

        var blockSrc = BlockSrc[glyph];

        if ( typeof(blockSrc) === 'undefined' )
          blockSrc = BlockSrc['missing'];

        width = dim * blockSrc[0].length;
        height = charHeight + dim * blockSrc[0].length/2;


        if (charDir == 'y') {
          for (var by = blockSrc.length - 1; by >= 0; by--) {
            for (var bx = 0; bx < blockSrc[by].length; bx++) {
              if (blockSrc[by][bx])
                str += drawBlock( color, x+dim*bx, y+dim*bx/2+dim*by, dim*2, dim*2);
            }
          }
        } else {
          for (var by = blockSrc.length - 1; by >= 0; by--) {
            for (var bx = blockSrc[by].length - 1; bx >= 0 ; bx--) {
              if (blockSrc[by][bx])
                  str += drawBlock( color, x + dim*bx, y - dim * bx/2 + dim*by, dim*2, dim*2);
            }
          }
        }

        return {
          svgStr: str,
          width: width,
          height: height
        };
      },

      /**
       * Writes an svg into the given selector with the given string with the given color
       * @param  {String} selector    The jQuery selector to write the string into
       * @param  {String} str         The string to write
       * @param  {String} color       Hex color of the highlight
       * @param  {Number} charHeight  The preffered height of each character
       * @param  {String} charDir     The orientation of the character 'x'=\ 'y'=/ 'zx'= facing |, top \ zy'= facing |, top /
       * @param  {String} stringDir   (ignored) The direction of the entire string 'x'= \; 'y'= /; 'z'= |; 'h'= -;
       *                              Note: charDir y will usually want to go in stringDir x
       * @return {Object}             The svg string, width and height of the final svg.
       */
      writeString: function( selector, str, color, charHeight, charDir, stringDir ) {

        var x = 0;
        var y = 0;
        var width = height = 0;
        var offset = 0;
        var bodyStr = '';
        var padding = charHeight / 9 * 2;
        var glyph;

        $(selector).empty();

        var strData = str.split('');

        // for each char in the string
        $.each(strData, function( i, v ){

          // write the glyph
          glyph = instance.writeGlyph(v, color, charHeight, charDir, x, y);

          bodyStr += glyph.svgStr;

          x += glyph.width + padding;

          switch (stringDir) {
            case 'h':
              // y doesn't change
              break;
            case 'x':
              y += glyph.width/2 + padding / 2;
              break;
            case 'y':
              y -= glyph.width/2 + padding / 2;
              break;
          }
        });

        width = Math.round(x-padding/2);

        switch (stringDir) {
          case 'h':
            height = Math.round(charHeight);
            offset = 0;
            break;
          case 'x':
            height = Math.round(y + charHeight);
            offset = 0;
            break;
          case 'y':
            height = Math.round(-y);
            offset = height - charHeight;
            break;
        }

        svgStr = '<svg width="' + width + '" height="' + height + '" overflow="visible">'
            // + '<g transform="translate(0,' + offset + ')">'
            + '<g transform="translate(0,' + 0 + ')">'
            + bodyStr
            + '</g>'
            + '</svg>';

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












