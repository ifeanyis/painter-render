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

  // 图层集合
  var bottomPointer, topPointer;
  var layerCollection = {};

  // 建立图层管理者
  var layerManager = {

    /**
     * 建立新图层
     * @param {string} id 图层名称，必须且唯一
     * @return 刚刚添加的图层
     */
    "add": function (id) {

      // 必须保证图层名称的唯一性
      if (layerCollection[id]) throw new Error('Layer [' + id + '] already exists!');

      // 建立新的图层实体
      var layer = {
        "canvas": document.createElement('canvas'),
        "pre": null,
        "next": null,
        "eyeable": true
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

      return layer;
    },

    /**
     * 查看图层或图层集合
     * @param {string} id 图层名称，不传递或者传递的图层不存在就是查看图层集合
     * @return 图层集合或图层
     */
    "see": function (id) {
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
    "delete": function (id) {
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
    },

    /**
     * 控制图层的显示和隐藏
     * @param {string} id 图层名称，不传递或传递的图层不存在就是不做任何操作
     * @param {boolean} eyeable 设置图层是否可见，可选，不传递就是交替显示和隐藏
     * @return 图层管理者
     */
    "togger": function (id, eyeable) {
      var layer = layerCollection[id];
      if (layer) layer.eyeable = typeof eyeable === 'boolean' ? eyeable : !layer.eyeable;
      return layerManager;
    },

    /**
     * 把一个图层的某个区域更新到目标图层的指定位置上
     * @param {json:id+x+y+width+height} source 源图层，必选
     * @param {json:id+x+y+width+height} target 目标图层，必选
     * @param {json} config 预留字段，可选
     * @return 图层管理者
     */
    "draw": function (source, target, config) {

      source.x = source.x || 0; source.y = source.y || 0;
      target.x = target.x || 0; target.y = target.y || 0;

      source.width = source.width || width; source.height = source.height || height;
      target.width = target.width || width; target.height = target.height || height;

      var layer = layerCollection[target.id];
      if (layerCollection[source.id] && layer) {
        layer.painter.save();
        layer.painter.drawImage(
          layerCollection[source.id].canvas,
          source.x, source.y, source.width, source.height,
          target.x, target.y, target.width, target.height
        );
        layer.painter.restore();
      }
      return layerManager;
    },

    /**
     * 更新所有可视图层到画布上
     * @return 图层管理者
     */
    "update": function () {
      var pointer = bottomPointer;
      painter.clearRect(0, 0, width, height);
      while (pointer != null) {
        if (layerCollection[pointer].eyeable) painter.drawImage(
          layerCollection[pointer].canvas,
          0, 0, width, height,
          0, 0, width, height
        );
        pointer = layerCollection[pointer].next;
      }
      return layerManager;
    }

  };

  // 返回图层管理者
  return layerManager;

};