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
};/**
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

  // 图层集合
  var bottomPointer, topPointer;
  var layerCollection = {};

  // 建立图层管理者
  var layerManager = {

    /**
     * 建立新图层
     * @param {string} id 图层名称，必须且唯一
     * @return 图层管理者
     */
    "addLayer": function (id) {

      // 必须保证图层名称的唯一性
      if (layerCollection[id]) throw new Error('Layer [' + id + '] already exists!');

      // 建立新的图层实体
      var layer = {
        "canvas": document.createElement('canvas'),
        "pre": null,
        "next": null
      };
      layer.canvas.setAttribute('width', width);
      layer.canvas.setAttribute('height', height);
      layer.painter = getCanvas2D(layer.canvas);

      // 放入图层集合中
      layerCollection[id] = layer;

      // 更新链表
      if (!bottomPointer && !topPointer) {
        // 空链表的时候
        bottomPointer = topPointer = id;
      } else {
        layerCollection[id].pre = topPointer;
        layerCollection[topPointer].next = id;
        topPointer = id;
      }

      return layerManager;
    },

    /**
     * 查看图层或图层集合
     * @param {string} id 图层名称，不传递或者传递的图层不存在就是查看图层集合
     * @return 图层集合或图层
     */
    "seeLayer": function (id) {
      return layerCollection[id] || {
        top: topPointer,
        bottom: bottomPointer,
        layers: layerCollection
      };
    },

    /**
     * 删除图层或图层集合
     * @param {string} id 图层名称，不传递或传递的图层不存在就是不做任何操作
     * @return 图层管理者
     */
    "delLayer": function (id) {
      var layer = layerCollection[id];
      if (layer) {

        // 顶点和底部指针
        if (topPointer == id) topPointer = layer.pre;
        if (bottomPointer == id) bottomPointer = layer.next;

        // 链表指针
        if (layer.pre != null) layerCollection[layer.pre].next = layer.next;
        if (layer.next != null) layerCollection[layer.next].pre = layer.pre;
      }

      // 删除图层
      delete layerCollection[id];
      return layerManager;
    }

  };

  // 返回图层管理者
  return layerManager;

};

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
