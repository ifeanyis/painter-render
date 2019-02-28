// 获取canvas2D对象
var getCanvas2D = function (node) {
  if (node && node.constructor === CanvasRenderingContext2D)
    return node;
  else {
    return node && node.getContext("2d");
  }
};