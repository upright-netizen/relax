window.Relax = (function (global) {
  var Model = function (elem, xv, yv) {
    this._elem = elem;
    this._xv = xv;
    this._yv = yv;

    global.addEventListener('scroll', this, false);
  }, lastPos = global.scrollY;

  Model.prototype.isVisible = function () {
    var rect = this._elem.getBoundingClientRect();

    return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth);
  };

  Model.prototype.move = function () {
    var top = global.getComputedStyle(this._elem, null).top || "0px";

    top = parseInt(top.replace('px', ''));

    this._elem.style.top = top + this._yv + "px";
    console.log('this._elem.style.top = ', top, this._yv, "px");
  };

  function getDirection (currentPos) {
    return (currentPos - lastPos) >= 0 ? -1 : 1;
  }

  /**
   * Currently only handles the 'scroll' event
   */
  Model.prototype.handleEvent = function (e) {
    if (global.scrollY < 0 || global.scrollY > global.document.height) {
      return;
    }
    this.direction = getDirection(global.scrollY);
    lastPos = global.scrollY;

    console.log(this.direction > 0 ? 'up' : 'down');

    if (this.isVisible()) {
      console.log('visible!', this._elem);
      this.move();
    }
  };

  return Model;
}(window));
