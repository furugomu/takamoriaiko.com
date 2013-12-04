var canvas = document.getElementById('canvas');
var queue = new createjs.LoadQueue(false);
var stage = new createjs.Stage(canvas);

var q = parseQuery(location.search.substring(1));
queue.loadFile(q.src || 'http://125.6.169.35/idolmaster/image_sp/event_flash/410/idol/idol_08_1_4.png');
var bpm = Number(q.bpm)||60;

queue.on('fileload', function(e) {
  var image = e.result;
  metronome(image);
});

createjs.Ticker.addEventListener('tick', function() {
  stage.update();
});

function metronome(image) {
  var bmp = new createjs.Bitmap(image);
  stage.addChild(bmp);
  bmp.regX = image.width / 2;
  bmp.regY = image.height;
  bmp.x = canvas.width / 2;
  bmp.y = canvas.height + 50;

  var duration = 60000 / bpm;
  bmp.rotation = -30;
  var swing = function() {
    createjs.Tween.get(bmp)
      .to({rotation: -bmp.rotation}, duration, createjs.Ease.sineInOut)
      .call(swing);
  }
  swing();
}

function parseQuery(s) {
  var d = {};
  s.split('&').forEach(function(x) {
    var pair = x.split('=');
    d[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  });
  return d;
}
