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
    var rect = this._elem.getBoundingClientRect(),
      top = rect.top + rect.height,
      bottom = rect.bottom - rect.height;
    // console.log("top: ", top, ", bottom: ", rect.bottom);
    return (top >= 0 &&
            rect.left >= 0 &&
            bottom <= window.innerHeight &&
            rect.right <= window.innerWidth);
  };

  // TODO: calculate position based on formula not blind addition to current position.
  // TODO: use transform() if available instead ot top and left.
  Model.prototype.move = function move () {
    var top = global.getComputedStyle(this._elem, null).top || "0px";
      left = global.getComputedStyle(this._elem, null).left || "0px";

    top = parseInt(top.replace('px', ''), 10);
    left = parseInt(left.replace('px', ''), 10);

    this._elem.style.top = top  + (this._yv * this._direction) + "px";
    this._elem.style.left = left  + (this._xv * this._direction) + "px";

    // console.log('moving...');
    // console.log("id: ", this._elem.id ,"lastPos: ", this._lastPos, "direction: ", this._direction);
    // console.log(this._elem.id, 'this._elem.style.top = ', top, this._yv, "px", "direction: ", this._direction);
  };

  Model.prototype.getDirection = function getDirection (currentPos) {
    return (currentPos - this._lastPos) >= 0 ? -1 : 1;
  };

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
      // console.log(this._elem.id, 'visible');
      this.move();
    }
  };

  return Model;
}(window));
