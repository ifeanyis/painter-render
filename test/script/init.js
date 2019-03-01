$$('body').css({
  "background-color": "#232325",
  "user-select": "none"
});

// 菜单
$$('<ul class="menu">' +
  "<li>文件</li>" +
  "<li>编辑</li>" +
  "<li>图像</li>" +
  "<li>图层</li>" +
  "<li>选择</li>" +
  "<li>滤镜</li>" +
  "<li>视图</li>" +
  "<li>帮助</li>" +
  '</ul>').appendTo('body');

// 工具配置
$$("<ul class='tool-config'>" +
  "" +
  "</ul>").appendTo('body');

// 工具箱
$$("<ul class='tool-box'>" +
  "<li class='polygon'>多边形</li>" +
  "<li class='text'>文字</li>" +
  "</ul>").appendTo('body');

// 画布
$$("<canvas>非常抱歉，您的浏览器不支持canvas!</canvas>")
  .appendTo('body')
  .css({
    "background-image": "url('./image/blank.jpg')",
    "background-position": "center"
  })
  .attr('width', 700)
  .attr('height', 500);

// 图层
var layerFrame = $$("<div></div>")
  .appendTo('body')
  .css({
    "width": "200px",
    "height": "500px",
    "display": "inline-block",
    "vertical-align": "top",
    "background-color": "#343437"
  });

$$("<ul id='layer'></ul>")
  .css({
    "height": "479px",
    "margin-bottom": "1px"
  })
  .appendTo(layerFrame);

var layer_button = $$("<div>" +
  "<span onclick='addLayer()'>+</span>" +
  "<span onclick='delLayer()'>-</span>" +
  "</div>")
  .css({
    "height": "20px",
    "text-align": "right",
    "background-color": "rgb(83, 83, 83)"
  })
  .appendTo(layerFrame)
  .find('span')
  .css({
    "cursor": "pointer",
    "width": "20px",
    "height": "20px",
    "outline": "none",
    "display": "inline-block",
    "border": "none",
    "font-size": "0",
    "vertical-align": "top",
    "background-repeat": "no-repeat",
    "background-position": "center"
  });

layer_button.eq(0).css('background-image', 'url(./image/add.png)');
layer_button.eq(1).css('background-image', 'url(./image/del.png)');