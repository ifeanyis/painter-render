function addLayer(id) {
  id = id || "图层" + (function () {
    window.layerNUm = window.layerNUm || 1;
    return window.layerNUm++;
  }());
  var layer = painter.layer.add(id);
  $$('#layer')[0].insertBefore($$("<li onclick='doSelectLayer(\"" + id + "\",this)' id='layer-" + id + "'>" +
    "<span isshow='yes' onclick='doTogger(\"" + id + "\",this)'></span>" +
    "<canvas width=30 height=30></canvas>" +
    "<span>" + id + "</span>" +
    "</li>")[0], $$('#layer').find('li')[0]);
}

function delLayer() {
  if (!window.currentLayer) {
    alert('温馨提示：请先选择需要删除的图层！');
    return;
  }
  if ($$('#layer').find('li').length == 1) {
    alert('温馨提示：只有一个图层，不可以删除！');
    return;
  }
  painter.layer.delete(window.currentLayer);
  $$('#layer-' + window.currentLayer).remove();
  window.currentLayer = undefined;
  painter.layer.update();
}

function doTogger(id, target) {
  painter.layer.togger(id);
  target = $$(target);
  if (target.attr('isshow') == 'yes') {
    target.attr('isshow', 'no');
  } else {
    target.attr('isshow', 'yes');
  }
  painter.layer.update();
}

function doSelectLayer(id, target) {
  window.currentLayer = id;
  $$('#layer').find('li').attr('isCurrent', 'no');
  $$(target).attr('isCurrent', 'yes');
}