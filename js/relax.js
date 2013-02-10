window.Relax = (function (global) {


  var Model = function (elem, xv, yv) {
    console.log('Relax mon.. ', elem, xv, yv);

    this._elem = elem;
    this._xv = xv;
    this._yv = yv;

    global.addEventListener('scroll', this, false);
  };

  Model.prototype.windowHeight = function () {
    return global.outerHeight;
  };

  Model.prototype.windowScrollY = function () {
    return global.scrollY;
  };

  Model.prototype.documentHeight = function () {
    return global.document.height;
  };

  Model.prototype.isVisible = function() {
    var eTop = this._elem.offsetTop,
      wBottom = this.windowScrollY() + this.windowHeight();

    if (eTop <= wBottom && eTop >= this.windowScrollY()) {
      return true;
    }

    return false;
  };

  Model.prototype.handleEvent = function (e) {
    if (this.windowScrollY() < 0 || this.windowScrollY() > this.documentHeight()) {
      return;
    }

    console.log('visible: ', this.isVisible());
  };

  return Model;
}(window));
