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

    // todo

  };

});
