/**
 * 
 * 图层启动器
 * -----------------------------------------
 * @param {node} canvas canvas结点，必须
 * @param {number} width 图层宽，可选
 * @param {number} height 图层高，可选
 * 
 * 图层启动器的任务是返回图层管理者，
 * 图层管理者管理着canvas2D画布上抽象出来的图层，
 * 提供图层的常规操作，主要有：
 * 1.图层内容到画布的更新；
 * 2.图层内容的常规编辑，绘图和图层调整层次等；
 * 3.图层中特殊的编辑，图形部分；
 * 4.图层中特殊的编辑，色彩，色相等高级部分。
 * 
 */
var layerRender = function (canvas, width, height) {

  // 获取画笔
  var painter = getCanvas2D(canvas);

  // 初始化图层尺寸
  if (typeof width !== 'number') width = canvas.clientWidth;
  if (typeof height !== 'number') height = canvas.clientHeight;

  // 图层
  

  // 建立图层管理者
  var layerManager = {



  };

  // 返回图层管理者
  return layerManager;

};