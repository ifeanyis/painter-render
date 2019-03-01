/**
 * 获取canvas2D对象
 * @param {node|CanvasRenderingContext2D} node canvas结点或2d绘图对象
 * @return 返回2d绘图对象
 */
var getCanvas2D = function (node) {
  if (node && node.constructor === CanvasRenderingContext2D)
    return node;
  else {
    return node && node.getContext("2d");
  }
};
