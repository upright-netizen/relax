window.Relax = (function (global) {
  var Model = function (elem, xv, yv) {
    this._elem = elem;
    this._xv = xv;
    this._yv = yv;
    this._lastPos = global.scrollY;
    this._direction = 1;

    global.addEventListener('scroll', this, false);
  };

  Model.prototype.isVisible = function isVisible () {
    var rect = this._elem.getBoundingClientRect();

    return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth);
  };

  Model.prototype.move = function move () {
    var top = global.getComputedStyle(this._elem, null).top || "0px";

    top = parseInt(top.replace('px', ''));

    this._elem.style.top = top  + (this._yv * this._direction) + "px";
    console.log("id: ", this._elem.id ,"lastPos: ", this._lastPos, "direction: ", this._direction);
    // console.log(this._elem.id, 'this._elem.style.top = ', top, this._yv, "px", "direction: ", this._direction);
  };

  Model.prototype.getDirection = function getDirection (currentPos) {
    return (currentPos - this._lastPos) >= 0 ? -1 : 1;
  }

  /**
   * Currently only handles the 'scroll' event
   */
  Model.prototype.handleEvent = function handleEvent (e) {
    if (global.scrollY < 0 || global.scrollY > global.document.height) {
      return;
    }
    this._direction = this.getDirection(global.scrollY);
    this._lastPos = global.scrollY;

    if (this.isVisible()) {
      this.move();
    }
  };

  return Model;
}(window));
