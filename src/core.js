(function (global, factory) {

  'use strict';

  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory();
  } else {
    global.painterRender = factory();
  }

})(typeof window !== "undefined" ? window : this, function (undefined) {

  'use strict';

  // @CODE build.js inserts compiled painter-render here

  return function (node) {

    // 建立绘图对象
    var painter = function () {

      // 这里编写常用的功能
      // 待定

    };

    // 挂载组件
    painter.layer = layerRender(node);

    // 返回绘图对象
    return painter;

  };

});
