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
    this.image = null;
    this.setListeners();

    this.start();
  },
  update: function() {
    this.angle += Math.PI * 0.05;
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
    image.src = url;
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
    var self = this;
    var ondrag = this.ondrag.bind(this);
    var moveEvents = ['mousemove', 'touchmove', 'MSPointerMove'];

    ['mousedown', 'touchstart', 'MSPointerDown'].forEach(function(start) {
      self.canvas.addEventListener(start, self.ondragstart.bind(self), false);

      self.canvas.addEventListener(start, function() {
        moveEvents.forEach(function(move) {
          self.canvas.addEventListener(move, ondrag, false);
        });
      }, false);

    });

    ['mouseup', 'touchend', 'MSPointerUp', 'MSPointerCancel'].forEach(function(end) {
      self.canvas.addEventListener(end, self.ondragend.bind(self), false);

      self.canvas.addEventListener(end, function() {
        moveEvents.forEach(function(move) {
          self.canvas.removeEventListener(move, ondrag, false);
        });
      }, false);
    });
  },

  ondragstart: function(e) {
    e.preventDefault();
    this.dragStartPosition = [e.clientX, e.clientY];
    // つついた場所を中心にする
    var p = this.canvasPosition();
    this.cx = e.clientX - p.left;
    this.cy = e.clientY - p.top;
  },
  ondrag: function(e) {
    // 回す範囲をひろげる
    if (!this.dragStartPosition) return;
    var width = Math.abs(this.dragStartPosition[0] - e.clientX);
    var height = Math.abs(this.dragStartPosition[1] - e.clientY);
    var radius = width > height ? width : height;
    if (radius < 4) return;
    this.radius = radius;
  },
  ondragend: function(e) {
    this.dragStartPosition = null;
  }
}
