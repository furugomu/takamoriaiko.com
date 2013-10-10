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
  '3000201': [
    '3000201/5f46c26436eed7cbf6bb6b52be22b520.mp4',
    '3000201/648ac8833870e6f5dbfaf7167b1d58a6.mp4',
    '3000201/25d046c4ee2c8c08f163aa073542b855.mp4',
    '3000201/19149c0be65b563d0b7ada48905aa2fd.mp4',
    '3000201/f5cb4dfe5f7b71922316ce00b55df1b7.mp4',
    '3000201/92b70ec4a6b143c7157471ec2f97a9db.mp4',
    '3000201/d2544deb1a04b52b1af862cc179fb22e.mp4',
    '3000201/5efe07503c7d1beee5e97906dfd21791.mp4',
    '3000201/249b474aad7a3f4030015ea4f25528c8.mp4',
    '3000201/aa5ba170aaae6c2479b19ca2dd7b3003.mp4',
    '3000201/668adc79504c08dd55963c76ec2358e6.mp4',
    '3000201/eab28de015599db879399b2db63537f3.mp4',
    '3000201/f7308cf637ae10c6df88f8f56d330994.mp4',
    '3000201/4f28acc59292fdd155ccb69951e22d4f.mp4',
  ],
  '3100202': [
    '3100202/12ff301ee4f02f3fa511f58c9e94418f.mp4',
    '3100202/5b2c45808179e953ccd1ba56d6e1b654.mp4',
    '3100202/643a889aab6a52091bb5f02fc78c0635.mp4',
    '3100202/12cc50315b8ad10cc20b6d890c793d63.mp4',
    '3100202/9e4aab744db602dd6f790e9afdbbe8cd.mp4',
    '3100202/987058d1ddf19dc18b7a3e89233b51fe.mp4',
    '3100202/ffdcff590d5bd1a62a74ef1e84ae002c.mp4',
    '3100202/ccd15fabbeb21e3fed4ab13f1f77aadc.mp4',
    '3100202/00c0f3e6723c7a4fe1e3baf303735be8.mp4',
    '3100202/af15979ab896be3120cbb50358fc5388.mp4',
    '3100202/0996a08b07e2caf9c4dfca2820ce528c.mp4',
    '3100202/00b33828c9bb13c5de56029f3eaca969.mp4',
    '3100202/0ce62921823212dd1f0c1b1eb014f8ad.mp4',
    '3100202/e30a2b83f594512c9a9c570c20c16c85.mp4',
  ],
  '3405201': [
    '3405201/eab9fec86a714b62312b6dd3372372dd.mp4',
    '3405201/24f07780fb4c13fe80dbab7de4b27639.mp4',
    '3405201/08b58b3551cdd9cb1a5b50c66d3cf9ec.mp4',
    '3405201/33d56d49b97c834d398a8ae3cad1e0d2.mp4',
    '3405201/de849385d4c6fe7ffb45f25a919120d1.mp4',
    '3405201/157154f46dda94b670049c894aa7e611.mp4',
    '3405201/010c9232df45c7d0ddd4aa3913656053.mp4',
    '3405201/1b3e77a8d2618b8f62d1a00a44b84303.mp4',
    '3405201/d2d8756a1b5a49ede6a34f481a7b227a.mp4',
    '3405201/8323132189b5a625f4b24559b974fb3c.mp4',
    '3405201/63e0e67a1cc4112aceb321a3a595baba.mp4',
    '3405201/e66c88a9523cde8d43134fefe0473ae7.mp4',
    '3405201/a7a962e9966fd017a107cc34dd203720.mp4',
    '3405201/3e05223d67709e90e32e88b8462b2b0c.mp4',
  ],
  '3505202': [
    '3505202/15b4145b99e62330ea5b2eb06f857318.mp4',
    '3505202/ed20f5c7afd0800202cd3cb19b00e78e.mp4',
    '3505202/298715dbb5b5d2aafd2ac1b00d18cb08.mp4',
    '3505202/a21cc6583792c5129ed32cb161b94e70.mp4',
    '3505202/298715dbb5b5d2aafd2ac1b00d18cb08.mp4',
    '3505202/95d98c1b06cfbad2625ff13f21ff6352.mp4',
    '3505202/afa29e16060d106a1159659b38953a05.mp4',
    '3505202/50dd75ac64394125cc622f570d77af7e.mp4',
    '3505202/e9e94d32014a9ea6de5265e9d74fa544.mp4',
    '3505202/44289cf10d91d37216ef15b9f6710d45.mp4',
    '3505202/045e75895f609cfbe8d5d81cb548d604.mp4',
    '3505202/0c15251f39e1d63f6c245204bf0a603b.mp4',
    '3505202/c0207d39fa62cb7e13dd744fcf391126.mp4',
    '3505202/8281b6cc3c80c449ada3a068bbeb0af9.mp4',
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
Player.setVoiceGroups(['9900014', '3000201', '3100202']);

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
  var groups = [].slice.apply(checkboxes)
    .filter(function(x) {return x.checked})
    .map(function(x) {return x.value});
  Player.setVoiceGroups(groups);
  // チェックしたのを保存
  localStorage.urusaiGroups = JSON.stringify(groups);
}, false);

// チェックしたのを復帰
if (localStorage.urusaiGroups) {
  var groups = JSON.parse(localStorage.urusaiGroups);
  Player.setVoiceGroups(groups);
  var checkboxes = document.getElementsByName('group');
  [].slice.apply(checkboxes)
    .forEach(function(x) {
      x.checked = groups.some(function(g){return x.value == g});
    });
}
