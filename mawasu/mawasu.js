"use strict";

function Mawasu() {
  this.initialize.apply(this, arguments);
}
Mawasu.prototype = {
  initialize: function(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.cx = 60;
    this.cy = 60;
    this.radius = 30;
    this.angle = 0;
    this.speed = 0.05;
    this.image = null;
    this.setListeners();

    // retina display
    var ratio = window.devicePixelRatio || 1;
    if (ratio !== 1) {
      this.canvas.style.width = (this.canvas.width/ratio)+'px';
      this.canvas.style.height = (this.canvas.height/ratio)+'px';
    }

    this.start();
  },
  update: function() {
    this.angle += Math.PI * this.speed;
    if (this.angle > Math.PI*2) this.angle -= Math.PI*2;
    this.draw();
  },
  draw: function() {
    if (!this.image) return;
    var ctx = this.ctx;

    ctx.drawImage(this.image, 0, 0);

    ctx.save();
    // 丸くくりぬく
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, this.radius, 0, Math.PI*2, false);
    ctx.clip();
    // 回してはりつける
    ctx.translate(this.cx, this.cy);
    ctx.rotate(this.angle);
    ctx.translate(-this.cx, -this.cy);
    ctx.drawImage(this.image, 0, 0);

    ctx.restore();
  },
  setImageURL: function(url) {
    var self = this;
    var image = new Image();
    image.addEventListener('load', function() {
      self.image = image;
    }, false);
    this.imageURL = image.src = url;
  },
  start: function() {
    var requestAnimationFrame =
      window.requestAnimationFrame || window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var update = this.update.bind(this);
    var step = function() {
      update();
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  },
  canvasPosition: function() {
    var left = 0, top = 0;
    for (var e = this.canvas; e; e = e.offsetParent) {
      left += e.offsetLeft;
      top += e.offsetTop;
    }
    return {left: left, top: top};
  },

  setListeners: function() {
    if (typeof(window.ontouchstart) !== 'undefined') {
      this.setTouchEventListeners();
    }
    else {
      this.setMouseEventListeners();
    }
  },
  setMouseEventListeners: function() {
    var self = this;
    var ondrag = this.ondrag.bind(this);
    var moveEvents = ['mousemove', 'touchmove', 'MSPointerMove'];

    this.canvas.addEventListener('mousedown', this.ondragstart.bind(this), false);
    this.canvas.addEventListener('mousedown', function() {
      self.canvas.addEventListener('mousemove', ondrag, false);
    }, false);

    this.canvas.addEventListener('mouseup', this.ondragend.bind(this), false);
    this.canvas.addEventListener('mouseup', function() {
      self.canvas.removeEventListener('mousemove', ondrag, false);
    }, false);
  },

  mouseX: function(e) {
    return (e.offsetX || this.touchX(e)) * (window.devicePixelRatio || 1);
  },
  mouseY: function(e) {
    return (e.offsetY || this.touchY(e)) * (window.devicePixelRatio || 1);
  },
  touchX: function(e) {
    return e.touches[0].pageX - this.canvasPosition().left;
  },
  touchY: function(e) {
    return e.touches[0].pageY - this.canvasPosition().top;
  },

  ondragstart: function(e) {
    e.preventDefault();
    this.dragStartPosition = [this.mouseX(e), this.mouseY(e)];
    // つついた場所を中心にする
    this.cx = this.mouseX(e);
    this.cy = this.mouseY(e);
  },
  ondrag: function(e) {
    // 回す範囲をひろげる
    if (!this.dragStartPosition) return;
    var width = Math.abs(this.dragStartPosition[0] - this.mouseX(e));
    var height = Math.abs(this.dragStartPosition[1] - this.mouseY(e));
    var radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
    if (radius < 4) return;
    this.radius = radius;
  },
  ondragend: function(e) {
    this.dragStartPosition = null;
  },

  setTouchEventListeners: function() {
    var self = this;
    this.canvas.addEventListener('touchstart', this.ontouchstart.bind(this), false);
    this.canvas.addEventListener('gesturechange', this.ongesturechange.bind(this), false);
  },
  ontouchstart: function(e) {
    if (e.touches.length !== 1) return;
    // つついた場所を中心にする
    this.cx = this.mouseX(e);
    this.cy = this.mouseY(e);
  },
  ongesturechange: function(e) {
    e.preventDefault();
    this.radius = e.scale * 100;
  },

  dump: function() {
    return 'x='+this.cx+'&y='+this.cy+'&r='+(this.radius|0)+
      '&u='+encodeURIComponent(this.imageURL);
  },
  restore: function(str) {
    var map = {};
    var pairs = str.split(/&/);
    for (var i in pairs) {
      var pair = pairs[i].split(/=/);
      map[pair[0]] = decodeURIComponent(pair[1]);
    }
    if (map.x) this.cx = map.x;
    if (map.y) this.cy = map.y;
    if (map.r) this.radius = map.r;
    if (map.u) this.setImageURL(map.u);
  },
}
