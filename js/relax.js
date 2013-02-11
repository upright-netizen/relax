window.Relax = (function (global) {
  var Model = function (elem, xv, yv) {
    this._elem = elem;
    this._xv = xv;
    this._yv = yv;

    global.addEventListener('scroll', this, false);
  };

  Model.prototype.isVisible = function() {
    var rect = this._elem.getBoundingClientRect();

    return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth);
  };

  /**
   * Currently only handles the 'scroll' event
   */
  Model.prototype.handleEvent = function (e) {
    if (global.scrollY < 0 || global.scrollY > global.document.height) {
      return;
    }

    if (this.isVisible()) {
      console.log('visible!', this._elem);
    }
  };

  return Model;
}(window));
