/* ruler js */
window.Ruler = (function (global, $) {
  var generate, getUnitClass, getWrapper, wrapperRef;

  generate = function (height) {
    var measure;

    getWrapper().find('.unit').remove();
    getWrapper().css('height', height + 'px');

    for (var i = 0; i < height; i += 100) {
      measure = $('<div class="unit" style="top: ' + i + 'px">' + i + '</div>');
      measure.addClass(getUnitClass(i));
      getWrapper().append(measure);
    }
  };

  getUnitClass = function(pos) {
    if (pos === 0) {
      return "small";
    }

    if (pos % 1000 === 0) {
      return "large";
    }

    if (pos % 500 === 0) {
      return "medium";
    }

    return "small";
  };

  getWrapper = function () {
    if (wrapperRef && $('#ruler-wrapper').length > 0) {
      return wrapperRef;
    }

    wrapperRef = $('<div id="ruler-wrapper" class="ruler-wrapper"></div>');
    $('body').append(wrapperRef);
    return wrapperRef;
  }

  return {
    generate: generate
  };
}(window, jQuery));
