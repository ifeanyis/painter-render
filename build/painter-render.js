/*!
*  @license painter-render v0.0.0next
* (c) 2019 yelloxing git+https://github.com/yelloxing/painter-render.git
* License: MIT
*/
(function (global, factory) {

  'use strict';

  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory();
  } else {
    global.painterRender = factory();
  }

})(typeof window !== "undefined" ? window : this, function (undefined) {

  'use strict';

  // 获取canvas2D对象
var getCanvas2D = function (node) {
  if (node && node.constructor === CanvasRenderingContext2D)
    return node;
  else {
    return node && node.getContext("2d");
  }
};



});
