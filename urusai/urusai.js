var baseUrl = 'http://idolmaster.edgesuite.net/idolmaster/sound/';
var allVoicePaths = {
  '9900014': [
    '9900014/eae08966a81417d698f22a9871841573.mp4',
    '9900014/fdf945f4c6d0719145ac46d592fceddb.mp4',
    '9900014/c85b042fac5029808d7a825191dcf006.mp4',
    '9900014/f08ab129b6bb5795e3611c56e4335477.mp4',
    '9900014/0c693440c96cd4cceeb4456145e6c303.mp4',
    '9900014/08cd73f1db0790c562f44ea38ebc8226.mp4',
    '9900014/f153aaffc9f1a223652910f06cce6c06.mp4',
  ],
  '9900015': [
    '9900015/73c99533d15a4b2bf169b0efea813ded.mp4',
    '9900015/b2fa1c811b6b124006a39ee3e78495ab.mp4',
    '9900015/2dcef72138eb3bbc794ac42e75c2cf22.mp4',
    '9900015/1348e439e5522c3474813e4f2924bf1f.mp4',
    '9900015/284accc57907e24e61b177ea403bf9b2.mp4',
    '9900015/7cf074bfc448a990a69518e1ccecb43e.mp4',
    '9900015/5aefd5317ab475fde52ece63e2397428.mp4',
  ],
  '3409001': [
    '3409001/6b171e64dbce3a8ea3d5616601e58792.mp4',
    '3409001/af6b78f548d07c8b66609dbcc6770e45.mp4',
    '3409001/7d206fe24443a1642ea742afcbe6dc29.mp4',
    '3409001/b65dc9a2e0a039a87ca52c89ddecd1c9.mp4',
    '3409001/6875e698d53862064d7675f67bc8e1b6.mp4',
    '3409001/7d79e95572364ad32ad82a4f3fe2d563.mp4',
    '3409001/13c83d532da97aa6c5e41a5e19b26aa0.mp4',
    '3409001/ecf912cd5f271ba85582191955abdb9c.mp4',
    '3409001/1fbacbd968bbb8e7cc86a9b477939fa5.mp4',
    '3409001/fa1c346c40119b9766229fca129f650c.mp4',
    '3409001/aff977dc9c7197ee234d192bbff74018.mp4',
    '3409001/e062b4ff0ea234c8e14410a0a6bccebb.mp4',
    '3409001/238314f1d43020bd8651e0b11a6413ef.mp4',
    '3409001/8716ad36e344776ae10ffb44ec696a58.mp4',
  ],
  '3509002': [
    '3509002/0572d1194e6d99dea99fe2484c94ead7.mp4',
    '3509002/62885af45c30f8982e6b5987f2dd297e.mp4',
    '3509002/4a11e0d36ab80d33c6a435cdacdac0df.mp4',
    '3509002/a71cd51ea1a72384697198b3cf75d9b0.mp4',
    '3509002/d029fccb18478876c1098a974ce16a43.mp4',
    '3509002/79e07ad785532c45f1ab00e0d459ea73.mp4',
    '3509002/5ec8d6ba8faaeb39cc4090653505acd4.mp4',
    '3509002/f071f3ca1009d7e69d382ad8dc1d6c47.mp4',
    '3509002/be158ed2c8083b1f92d6492a2a087894.mp4',
    '3509002/11674f7f5bd01404e34297ae26963f72.mp4',
    '3509002/708d20587865a99f752459da97a42fc0.mp4',
    '3509002/2ee97323e674c238baf0ced5b3bdb3b6.mp4',
    '3509002/9bcd8d4ef7e88b8a3c2497cfad8f5233.mp4',
    '3509002/e454167721036cce63542aaff3e61671.mp4',
  ],
};

var Player = {
  initialVolume: 0.7,
  maxPlayings: 3,
  audios: [],
  started: false,

  changeVolume: function(volume) {
    if (volume > 1) volume = 1;
    this.initialVolume = volume;
    for (var i = 0; i < this.audios.length; ++i) {
      this.audios[i].volume = volume;
    }
  },
  start: function() {
    this.stop();
    this.started = true;
    for (var i = 0; i < this.maxPlayings; ++i) {
      var audio = this.addAudio();
      // 1000msずつずらして再生
      (function(a, t) {
        setTimeout(function() {a.play()}, t);
      })(audio, i*1000);
    }
  },
  stop: function() {
    this.started = false;
    for (var i = 0; i < this.audios.length; ++i) {
      this.audios[i].pause();
      delete this.audios[i];
    }
    this.audios = [];
  },
  addAudio: function() {
    var choice = function(xs) { return xs[Math.floor(Math.random()*xs.length)] };
    var player = this;
    var a = new Audio();
    this.audios.push(a);
    a.src = baseUrl + choice(this.voicePaths);
    // 終わったら別のをランダムに再生する
    a.addEventListener('ended', function(e) {
      e.target.src = baseUrl + choice(player.voicePaths);
      e.target.play();
    }, false);
    return a;
  },
  setMaxPlayings: function(n) {
    var diff = n - this.maxPlayings;
    this.maxPlayings = n;
    // 減り
    for (var i = 0; i > diff; --i) {
      this.audios.pop().pause();
    }
    // 増え
    for (var i = 0; i < diff; ++i) {
      var audio = this.addAudio();
      if (this.started) audio.play();
    }
  },
  setVoiceGroups: function(groups) {
    this.voicePaths = [];
    for (var i = 0; i < groups.length; ++i) {
      this.voicePaths = this.voicePaths.concat(allVoicePaths[groups[i]]);
    }
  }
}
Player.setVoiceGroups(['9900014']);

document.getElementById('volume').addEventListener('change', function(e) {
  Player.changeVolume(e.target.value);
}, false);
document.getElementById('noisiness').addEventListener('change', function(e) {
  Player.setMaxPlayings(e.target.value);
}, false);
document.getElementById('start').addEventListener('click', function() {
  Player.start();
}, false);
document.getElementById('stop').addEventListener('click', function() {
  Player.stop();
}, false);

document.addEventListener('click', function(e) {
  if (e.target.name !== 'group') return;
  var checkboxes = document.getElementsByName('group');
  var groups = Array.prototype.slice.apply(checkboxes)
    .filter(function(x) {return x.checked})
    .map(function(x) {return x.value});
  Player.setVoiceGroups(groups);
}, false);
