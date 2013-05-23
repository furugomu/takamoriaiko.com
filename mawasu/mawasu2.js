var App = Backbone.Router.extend({
  initialize: function(options) {
    this.mawasu = new MawasuView({model: new Aiko()});
    this.collection = options.collection;
  },
  routes: {
    "": "root",
    ":id(/:cx/:cy/:radius)": "image",
  },
  root: function() {
    console.log('root');
    var model = this.collection.first();
    model.load();
    this.mawasu.model = model;
  },
  image: function(id, cx, cy, radius) {
    var model = this.collection.get(id);
    if (model) {
      model.load();
      if (cx) {
        model.set({cx: cx, cy: cy, radius: radius});
      }
      this.mawasu.model = model;
    }
  }
});

var Aiko = Backbone.Model.extend({
  defaults: function() {
    var r = function(lo, hi) {
      return Math.floor(Math.random()*(hi-lo)) + lo;
    }
    return {
      cx: r(40, 600),
      cy: r(100, 700),
      radius: r(60, 200),
    };
  },

  imageUrl: function(size) {
    return 'http://125.6.169.35/idolmaster/image_sp/card/' +
      size + '/' + this.id + '.jpg';
  },
  thumbnailUrl: function() { return this.imageUrl('xs') },

  load: function() {
    if (this.image) return;
    var image = new Image();
    image.src = this.imageUrl('l');
    image.addEventListener('load', _.bind(function() {
      this.image = image;
      this.trigger('load');
    }, this), false);
  },
});

var AikoList = Backbone.Collection.extend({model: Aiko});

var MawasuView = Backbone.View.extend({
  el: 'canvas',
  events: {
    mousedown: 'dragStart',
    mousemove: 'drag',
    mouseup: 'dragEnd',
  },

  initialize: function() {
    var canvas = this.el;
    this.ctx = canvas.getContext('2d');
    this.angle = 0;
    this.speed = 0.05;
    this.image = null;

    // retina display
    var ratio = window.devicePixelRatio || 1;
    if (ratio !== 1) {
      canvas.style.width = (canvas.width/ratio)+'px';
      canvas.style.height = (canvas.height/ratio)+'px';
    }

    this.start();
  },

  // Canvas 関係のメソ

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
  update: function() {
    this.angle += Math.PI * this.speed;
    if (this.angle > Math.PI*2) this.angle -= Math.PI*2;
    this.draw();
  },
  draw: function() {
    if (!this.model.image) return;
    var ctx = this.ctx;
    var cx = this.model.get('cx');
    var cy = this.model.get('cy');

    ctx.drawImage(this.model.image, 0, 0);

    ctx.save();
    // 丸くくりぬく
    ctx.beginPath();
    ctx.arc(cx, cy, this.model.get('radius'), 0, Math.PI*2, false);
    ctx.strokeStyle = 'magenta';
    if (this.dragStartPosition) ctx.stroke();
    ctx.clip();
    // 回してはりつける
    ctx.translate(cx, cy);
    ctx.rotate(this.angle);
    ctx.translate(-cx, -cy);
    ctx.drawImage(this.model.image, 0, 0);

    ctx.restore();
  },

  // event listeners

  dragStart: function(e) {
    e.preventDefault();
    this.dragStartPosition = [e.offsetX, e.offsetY];
    // つついた場所を中心にする
    this.model.set({cx: e.offsetX, cy: e.offsetY});
  },
  drag: function(e) {
    if (!this.dragStartPosition) return;
    // 回す範囲をひろげる
    var width = Math.abs(this.dragStartPosition[0] - e.offsetX);
    var height = Math.abs(this.dragStartPosition[1] - e.offsetY);
    var radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
    if (radius < 4) return;
    this.model.set('radius', radius);
  },
  dragEnd: function(e) {
    this.dragStartPosition = null;
  },
});

// 藍子を選ぶ 一覧
var ChoicesView = Backbone.View.extend({
  el: '#choices',
  initialize: function() {
    var self = this;
    _.bindAll(this, 'add');
    this.collection.each(this.add);
    this.listenTo(this.collection, 'add', this.add);
  },
  add: function(model) {
    var choiceView = new ChoiceView({model: model});
    this.$el.append(choiceView.render().el);
  },
  render: function() {
    return this;
  },
});

// 藍子を選ぶ なかみ
var ChoiceView = Backbone.View.extend({
  tagName: 'img',
  className: 'choice',
  events: {
    click: 'select',
  },
  render: function() {
    this.$el.attr('src', this.model.thumbnailUrl());
    return this;
  },
  select: function(e) {
    e.preventDefault();
    app.navigate(this.model.id, {trigger: true});
  },
});

jQuery(function($) {
  var aikoList = new AikoList([
    {id: "25ea7fdd66fc6bd8e7209a4c0d2ba00c"},
    {id: "57bfd18f73cf672d05643716f74bbc48"},
    {id: "8406433757bac86ef8134cd59ed4cd3b"},
    {id: "55f34023e9d773f97afde9bb99574843"},
    {id: "f70f143d7bb856a67cb7bbd175dc7829"},
    {id: "d6dbb1e8e2c5e452026e993c5a8fde56"},
    {id: "a14b13704b20edf9834c27832fd1670f"},
    {id: "d0289c681ff7668957a4d7a4198b61aa"},
    {id: "6efffe43696b87d64380769c40a3f12d"},
    {id: "0321c8e5bf54a3c4602ee87bac727750"},
  ]);
  var app = window.app = new App({collection: aikoList});
  new ChoicesView({collection: aikoList});
  Backbone.history.start();
});
